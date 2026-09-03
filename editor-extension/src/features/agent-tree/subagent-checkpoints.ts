import { mkdir, open, readFile, rename, writeFile } from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { z } from 'zod';
import type { SubagentState } from '@akasha/editor-extension/subagent-core';

// WHAT A SEAT'S TRANSCRIPT ALREADY SAID, WRITTEN DOWN SO IT IS SAID ONCE.
//
// `advance` folds a transcript from its first byte and holds the fold in a cursor, so a poll costs
// only the bytes appended since the last one. An activation starts with no cursor at all, and ten
// live seats carried 227 MB between them the day this was written: folding that from nothing is
// seconds of decoding and `JSON.parse` with no await in it, which is the extension host's event
// loop stopped, not merely the Agents panel being late.
//
// The fold is exact and these files only ever grow, so it is banked and resumed rather than
// recomputed. What is banked beside the offset is the 64 bytes that end it. A transcript replaced
// under a path already banked would otherwise be resumed from an offset that means nothing there,
// and the Agents panel would draw rows that are quietly wrong rather than slow — the worse of the
// two outcomes. The anchor costs one 64-byte read and refuses that file outright.

const ANCHOR_BYTES = 64;

const STRING_PAIRS = z.array(z.tuple([z.string(), z.string()]));

const BANKED = z.object({
	path: z.string(),
	offset: z.number().int().positive(),
	anchor: z.string(),
	labels: STRING_PAIRS,
	agentByTool: STRING_PAIRS,
	running: z.array(z.tuple([z.string(), z.boolean()])),
	awaiting: z.array(z.string()),
});

const BOOK = z.object({
	version: z.literal(1),
	cursors: z.record(z.string(), BANKED),
});

export interface Checkpoint {
	readonly path: string;
	readonly offset: number;
	readonly anchor: string;
	readonly state: SubagentState;
}

export function checkpointBook(): string {
	return path.join(os.homedir(), '.cache', 'ops', 'agent-tree-cursors.json');
}

// The bytes that end `offset`, which say the file still reads the way it did when it was folded to
// there. A short read means the file no longer reaches that far, and nothing is claimed.
export async function anchorEnding(filePath: string, offset: number): Promise<string | null> {
	if (offset <= 0) { return null; }
	const from = Math.max(0, offset - ANCHOR_BYTES);
	const wanted = offset - from;
	const buffer = Buffer.allocUnsafe(wanted);
	let handle;
	try {
		handle = await open(filePath, 'r');
	} catch {
		return null;
	}
	try {
		const { bytesRead } = await handle.read(buffer, 0, wanted, from);
		if (bytesRead !== wanted) { return null; }
	} catch {
		return null;
	} finally {
		await handle.close();
	}
	return buffer.toString('base64');
}

export async function readCheckpoints(): Promise<ReadonlyMap<string, Checkpoint>> {
	const held = new Map<string, Checkpoint>();
	let text: string;
	try {
		text = await readFile(checkpointBook(), 'utf8');
	} catch {
		return held;
	}
	let read: unknown;
	try {
		read = JSON.parse(text);
	} catch {
		return held;
	}
	const parsed = BOOK.safeParse(read);
	if (!parsed.success) { return held; }
	for (const [key, one] of Object.entries(parsed.data.cursors)) {
		held.set(key, {
			path: one.path,
			offset: one.offset,
			anchor: one.anchor,
			state: {
				labels: new Map(one.labels),
				agentByTool: new Map(one.agentByTool),
				running: new Map(one.running),
				awaiting: new Set(one.awaiting),
			},
		});
	}
	return held;
}

// Written beside and renamed over, because several extension hosts share this book and a half
// written one reads as no book at all — which costs a refold, where a torn one costs the truth.
export async function writeCheckpoints(held: ReadonlyMap<string, Checkpoint>): Promise<undefined> {
	const cursors: Record<string, z.infer<typeof BANKED>> = {};
	for (const [key, one] of held) {
		cursors[key] = {
			path: one.path,
			offset: one.offset,
			anchor: one.anchor,
			labels: [...one.state.labels],
			agentByTool: [...one.state.agentByTool],
			running: [...one.state.running],
			awaiting: [...one.state.awaiting],
		};
	}
	const at = checkpointBook();
	const beside = `${at}.${process.pid}`;
	await mkdir(path.dirname(at), { recursive: true });
	await writeFile(beside, JSON.stringify({ version: 1, cursors }));
	await rename(beside, at);
	return undefined;
}
