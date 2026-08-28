import { PALETTE_NAMES } from '../palette.ts';

export const TURN_SCHEME_PATH = 'turn';

export const COLOUR_ID_PREFIX = 'ops.color.';

export function turnColourIn(path: string): string | undefined {
	const found = /^\/(?:turn|subagent)\/([a-z-]+)\//.exec(path);
	if (found === null) { return undefined; }
	const name = found[1] ?? '';
	return PALETTE_NAMES.has(name) ? `${COLOUR_ID_PREFIX}${name}` : undefined;
}

export function turnStateSaid(state: string | undefined, waitingOn: string | undefined): string | undefined {
	if (state === undefined || state === 'unknown') { return undefined; }
	return waitingOn === undefined ? state : `${state} on ${waitingOn}`;
}
