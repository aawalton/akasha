import * as path from 'node:path';
import { duringOneCall } from '../../../during-call/during-call.ts';
import { colorsOf } from '../../../tools/lib/agent-turn-drawn.ts';
import { akashaRoot, repositoryPath } from '../harness-call.ts';
import { colorNamed } from '../palette.ts';

export const SEAT_SIDECAR_GLOB = '*.uncommitted.yaml';

const AKASHA_SEAT_DIR = path.join('agent', 'seat');

export function seatDirs(): readonly string[] {
	return [repositoryPath(seatPagesDir())];
}

export function seatPagesDir(): string {
	return path.join(akashaRoot(), AKASHA_SEAT_DIR);
}

export function coloursOf(named: Readonly<Record<string, string>>): ReadonlyMap<string, string> {
	const found = new Map<string, string>();
	for (const [id, name] of Object.entries(named)) {
		const color = colorNamed(name);
		if (color !== undefined) { found.set(id, color); }
	}
	return found;
}

export async function readSeatTurnColors(
	agentIds: readonly string[]
): Promise<ReadonlyMap<string, string>> {
	if (agentIds.length === 0) { return new Map<string, string>(); }
	return duringOneCall(async () => coloursOf(colorsOf(agentIds)));
}
