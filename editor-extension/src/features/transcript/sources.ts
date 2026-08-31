import * as fs from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import { akashaSeatsStanding } from '../../../../tools/lib/seat-akasha-beside.ts';
import { akashaSeatRecordOf } from '../../../../tools/lib/seat-akasha-read.ts';

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

// WHERE A SEAT'S TRANSCRIPT IS, READ FROM AKASHA. This walked the old seat directory, opened every
// page for its id, and took the transcript from the sidecar beside it or the page underneath. Both
// halves of that live in akasha now: the index names every seat standing, and the transcript is one
// of the values carried beside the page, so a seat that stands only there is no longer invisible.
export function readSeatTranscripts(): readonly SeatTranscript[] {
	const found: SeatTranscript[] = [];
	for (const [agentId, seatName] of akashaSeatsStanding()) {
		const held = akashaSeatRecordOf(agentId, TRANSCRIPT_KEY);
		if (held === null || held.value === '') { continue; }
		found.push({ agentId, seatName, transcriptPath: held.value });
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
