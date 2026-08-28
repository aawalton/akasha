/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Finding a seat's transcript on disk, and the subagent files beside it.
 *
 * The link from a seat to its transcript is the `transcript-path` key on the
 * seat's own page in the memory repository, which the seat's supervisor keeps
 * current. It carries Claude's own `transcript_path`, which is the
 * authoritative one — the path is NOT recomputed from the seat's cwd, because
 * the slug encoding has caught people out (`/home` is a symlink to
 * `/var/home` here, so the directory is `-var-home-...`).
 *
 * THE PAGE IS RE-READ RATHER THAN CACHED. A session id rotates on resume
 * and on compact, and each rotation moves the transcript to a new file. A
 * reader holding the first path it saw goes on reading a frozen file and shows
 * a seat that stopped talking, which is indistinguishable from a seat that is
 * merely quiet.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import { seatNameOf, frontmatterValue } from '../../seat/seat-page.ts';
import { seatPagesDir } from '../../seat/turn-color.ts';

export interface SeatTranscript {
	readonly agentId: string;
	readonly seatName: string;
	readonly transcriptPath: string;
}

/** One subagent's transcript, joined to the call that ran it. */
export interface SubagentTranscript {
	/** The id of the `tool_use` block that ran this subagent. */
	readonly toolUseId: string;
	readonly agentType: string | null;
	readonly description: string | null;
	readonly filePath: string;
}

function seatTranscriptAt(filePath: string): SeatTranscript | null {
	let text: string;
	try {
		text = fs.readFileSync(filePath, 'utf8');
	} catch {
		return null;
	}
	const agentId = frontmatterValue(text, 'id');
	const transcriptPath = frontmatterValue(text, 'transcript-path');
	if (agentId === null || transcriptPath === null) { return null; }
	return { agentId, seatName: seatNameOf(path.basename(filePath)), transcriptPath };
}

/**
 * Every seat whose page states a transcript. A page stating none is a seat with
 * nothing to show, not an error, and an unreadable file costs its own row only.
 */
export function readSeatTranscripts(): readonly SeatTranscript[] {
	let names: readonly string[];
	try {
		names = fs.readdirSync(seatPagesDir());
	} catch {
		return [];
	}
	const found: SeatTranscript[] = [];
	for (const name of names) {
		if (!name.endsWith('.md')) { continue; }
		const seat = seatTranscriptAt(path.join(seatPagesDir(), name));
		if (seat !== null) { found.push(seat); }
	}
	return found;
}

export function seatTranscriptOf(agentId: string): SeatTranscript | null {
	return readSeatTranscripts().find((seat) => seat.agentId === agentId) ?? null;
}

/** What a subagent's `.meta.json` carries that we read. */
const subagentMetaSchema = z.looseObject({
	toolUseId: z.string(),
	agentType: z.string().optional(),
	description: z.string().optional(),
});

function readSubagentMeta(filePath: string): z.infer<typeof subagentMetaSchema> | null {
	try {
		const text = z.string().parse(fs.readFileSync(filePath, 'utf8'));
		const parsed = subagentMetaSchema.safeParse(JSON.parse(text));
		return parsed.success ? parsed.data : null;
	} catch {
		return null;
	}
}

/**
 * The subagents a transcript ran, keyed by the call that ran each.
 *
 * Beside `<session-id>.jsonl` sits a `<session-id>/subagents/` directory of
 * `agent-<id>.jsonl` files, each with an `agent-<id>.meta.json` carrying
 * `toolUseId`. That field is an exact join back to the `tool_use` block, which
 * is why the fourth criterion needs no text scraping — the alternative was
 * pulling an id out of the result prose, which breaks whenever the wording
 * changes.
 */
export function readSubagents(transcriptPath: string): ReadonlyMap<string, SubagentTranscript> {
	const byToolUseId = new Map<string, SubagentTranscript>();
	const directory = transcriptPath.replace(/\.jsonl$/, '');
	const subagentsDir = path.join(directory, 'subagents');

	let names: readonly string[];
	try {
		names = fs.readdirSync(subagentsDir);
	} catch {
		// No subagents ran, which is the common case.
		return byToolUseId;
	}

	for (const name of names) {
		if (!name.endsWith('.meta.json')) { continue; }
		const meta = readSubagentMeta(path.join(subagentsDir, name));
		if (meta === null) { continue; }

		const jsonlName = name.replace(/\.meta\.json$/, '.jsonl');
		const filePath = path.join(subagentsDir, jsonlName);
		if (!fs.existsSync(filePath)) { continue; }

		byToolUseId.set(meta.toolUseId, {
			toolUseId: meta.toolUseId,
			agentType: meta.agentType ?? null,
			description: meta.description ?? null,
			filePath,
		});
	}
	return byToolUseId;
}

/**
 * The transcript as text. An absent or unreadable file answers with the empty
 * string rather than throwing: the panel polls a path that a rotation may have
 * moved out from under it, and a missing file there is an ordinary moment
 * rather than a fault.
 */
export function readTranscriptText(transcriptPath: string): string {
	try {
		return z.string().parse(fs.readFileSync(transcriptPath, 'utf8'));
	} catch {
		return '';
	}
}
