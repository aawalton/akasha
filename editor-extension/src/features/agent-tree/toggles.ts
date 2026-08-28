import { z } from 'zod';
import type { SeatMode } from '../../seat/mode.ts';
import { askHarness } from './harness.ts';

export interface SeatToggleState {
	readonly running: boolean;
	readonly place: SeatMode;
}

export type SeatStep =
	| { readonly kind: 'stop' }
	| { readonly kind: 'revive' }
	| { readonly kind: 'resume-interactive' }
	| { readonly kind: 'state-place'; readonly place: SeatMode }
	| { readonly kind: 'attach' }
	| { readonly kind: 'detach' }
	| { readonly kind: 'reset' };

export function planRunToggle(state: SeatToggleState): readonly SeatStep[] {
	if (state.running) { return [{ kind: 'stop' }]; }
	return state.place === 'interactive' ? [{ kind: 'resume-interactive' }] : [{ kind: 'revive' }];
}

export function planPlaceToggle(state: SeatToggleState): readonly SeatStep[] {
	const place: SeatMode = state.place === 'interactive' ? 'headless' : 'interactive';
	const stated: SeatStep = { kind: 'state-place', place };
	if (!state.running) { return [stated]; }
	return place === 'interactive' ? [stated, { kind: 'attach' }] : [stated, { kind: 'detach' }];
}


export function planReset(state: SeatToggleState): readonly SeatStep[] {
	const reset: SeatStep = { kind: 'reset' };
	return state.place === 'interactive' ? [reset, { kind: 'attach' }] : [reset];
}

const EditorReviveZ = z.object({ 'editor-revive': z.string().min(1) });

export async function resumePrompt(): Promise<string> {
	const answer = await askHarness('compose-notices');
	return EditorReviveZ.parse(answer)['editor-revive'];
}

const SEAT_NAME_RE = /^[a-z0-9][a-z0-9-]*$/;

const SEAT_NAME_REQUIREMENT =
	'a seat name is lower-case letters, digits and hyphens, opening with a letter or a digit';

export function seatNameAccepted(name: string): boolean {
	return SEAT_NAME_RE.test(name);
}

export function attachCommandLine(name: string): string {
	if (!seatNameAccepted(name)) {
		throw new Error(`${JSON.stringify(name)} is not a seat name: ${SEAT_NAME_REQUIREMENT}`);
	}
	return `tmux attach-session -t "=${name}"`;
}

export function seatContextValue(live: boolean, place: SeatMode): string {
	return `seat.${live ? 'running' : 'stopped'}.${place}`;
}
