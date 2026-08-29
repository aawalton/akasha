import * as fs from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import { seatNameOf, frontmatterValue, sidecarValue } from '../../seat/seat-page.ts';
import { seatPagesDir } from '../../seat/turn-color.ts';

export interface SeatTranscript {
	readonly agentId: string;
	readonly seatName: string;
	readonly transcriptPath: string;
}

export interface SubagentTranscript {
	readonly toolUseId: string;
	readonly agentType: string | null;
	readonly description: string | null;
	readonly filePath: string;
}

const TRANSCRIPT_KEY = 'transcript-path';

function besideThePage(filePath: string, key: string): string | null {
	let text: string;
	try {
		text = fs.readFileSync(filePath.replace(/\.md$/, '.uncommitted.yaml'), 'utf8');
	} catch {
		return null;
	}
	return sidecarValue(text, key);
}

function seatTranscriptAt(filePath: string): SeatTranscript | null {
	let text: string;
	try {
		text = fs.readFileSync(filePath, 'utf8');
	} catch {
		return null;
	}
	const agentId = frontmatterValue(text, 'id');
	const transcriptPath =
		besideThePage(filePath, TRANSCRIPT_KEY) ?? frontmatterValue(text, TRANSCRIPT_KEY);
	if (agentId === null || transcriptPath === null) { return null; }
	return { agentId, seatName: seatNameOf(path.basename(filePath)), transcriptPath };
}

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

export function readSubagents(transcriptPath: string): ReadonlyMap<string, SubagentTranscript> {
	const byToolUseId = new Map<string, SubagentTranscript>();
	const directory = transcriptPath.replace(/\.jsonl$/, '');
	const subagentsDir = path.join(directory, 'subagents');

	let names: readonly string[];
	try {
		names = fs.readdirSync(subagentsDir);
	} catch {
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

export function readTranscriptText(transcriptPath: string): string {
	try {
		return z.string().parse(fs.readFileSync(transcriptPath, 'utf8'));
	} catch {
		return '';
	}
}
