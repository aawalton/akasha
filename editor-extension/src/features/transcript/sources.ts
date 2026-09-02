import * as fs from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import { runVerb, verbPath } from '../../harness-call.ts';

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

const CALL_TIMEOUT_MS = 30_000;

const MAX_BUFFER = 4 * 1024 * 1024;

// WHERE A SEAT'S TRANSCRIPT IS, ASKED OF A BUN CHILD. Reading it opens the values kept beside a
// seat's page, and loading one of those needs a transpiler only bun carries, so doing it here threw
// `Bun is not defined` in an extension host that node runs. `tools/seat-transcripts.ts` answers the
// whole list at once, and it is held for a moment because the transcript panel asks on every tick
// and the agent tree asks once per live seat.
const HOLD_MS = 5_000;

let held: { readonly at: number; readonly seats: readonly SeatTranscript[] } | null = null;

export function dropSeatTranscripts(): void {
	held = null;
}

function seatsIn(answered: unknown): readonly SeatTranscript[] {
	if (answered === null || typeof answered !== 'object' || !Array.isArray((answered as { seats?: unknown }).seats)) {
		throw new Error('seat-transcripts: the answer carries no `seats` array');
	}
	return (answered as { seats: readonly unknown[] }).seats.map((raw, at) => {
		if (raw === null || typeof raw !== 'object') {
			throw new Error(`seat-transcripts: seats[${at}] is not an object`);
		}
		const row = raw as Record<string, unknown>;
		if (typeof row.agentId !== 'string' || typeof row.seatName !== 'string' || typeof row.transcriptPath !== 'string') {
			throw new Error(`seat-transcripts: seats[${at}] carries no agentId, seatName and transcriptPath`);
		}
		return { agentId: row.agentId, seatName: row.seatName, transcriptPath: row.transcriptPath };
	});
}

export async function readSeatTranscripts(): Promise<readonly SeatTranscript[]> {
	const now = Date.now();
	if (held !== null && now - held.at < HOLD_MS) { return held.seats; }
	const stdout = await runVerb(verbPath('seat-transcripts'), [], {
		timeout: CALL_TIMEOUT_MS,
		maxBuffer: MAX_BUFFER,
	});
	let answered: unknown;
	try {
		answered = JSON.parse(stdout);
	} catch (err) {
		throw new Error(`seat-transcripts did not print JSON: ${String(err)}`);
	}
	const seats = seatsIn(answered);
	held = { at: now, seats };
	return seats;
}

export async function seatTranscriptOf(agentId: string): Promise<SeatTranscript | null> {
	return (await readSeatTranscripts()).find((seat) => seat.agentId === agentId) ?? null;
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
