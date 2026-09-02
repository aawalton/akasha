import * as path from 'node:path';
import { akashaRoot, repositoryPath, runVerb, verbPath } from '../harness-call.ts';
import { colorNamed } from '../palette.ts';

const CALL_TIMEOUT_MS = 30_000;

const MAX_BUFFER = 4 * 1024 * 1024;

const VERB = 'agent-turn-colors';

// WHERE A SEAT STANDS, WHICH IS AKASHA AND NOWHERE ELSE. The watchers every feature registers are
// built from these two, so pointing them here is what moves the agent tree, the terminal names and
// the work tree onto the store the fleet actually writes.
const AKASHA_SEAT_DIR = 'akasha/seat-system/seat/seats';

export const SEAT_SIDECAR_GLOB = '*.uncommitted.ts';

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

export function readTurnColorAnswer(answered: unknown): Readonly<Record<string, string>> {
	if (answered === null || typeof answered !== 'object') {
		throw new Error(`${VERB}: the answer is not an object, so it names no colour`);
	}
	const held = (answered as { colors?: unknown; colours?: unknown });
	const named = held.colors ?? held.colours;
	if (named === null || named === undefined || typeof named !== 'object') {
		throw new Error(`${VERB}: the answer carries neither a \`colors\` nor a \`colours\` record`);
	}
	const found: Record<string, string> = {};
	for (const [id, colour] of Object.entries(named as Record<string, unknown>)) {
		if (typeof colour !== 'string' || colour === '') {
			throw new Error(`${VERB}: the colour answered for ${id} is no name`);
		}
		found[id] = colour;
	}
	return found;
}

// ASKED AS A CHILD RATHER THAN READ HERE. Reading a seat's turn state reaches akasha page bodies,
// and loading one wants a transpiler only bun carries, so in this node host the whole reach threw
// at import before a colour was ever asked for.
export async function readSeatTurnColors(
	agentIds: readonly string[]
): Promise<ReadonlyMap<string, string>> {
	if (agentIds.length === 0) { return new Map<string, string>(); }
	const stdout = await runVerb(verbPath(VERB), agentIds, {
		timeout: CALL_TIMEOUT_MS,
		maxBuffer: MAX_BUFFER,
	});
	let answered: unknown;
	try {
		answered = JSON.parse(stdout);
	} catch (err) {
		throw new Error(`${VERB} did not print JSON: ${String(err)}`);
	}
	return coloursOf(readTurnColorAnswer(answered));
}
