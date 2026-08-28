/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import type { SeatStep, SeatToggleState } from './toggles.ts';

/**
 * The acts a row's menu offers, spelled as the triggers the caller already logs
 * them under.
 */
export type SeatAct =
	| 'place-interactive'
	| 'place-headless'
	| 'run-stop'
	| 'run-resume'
	| 'run-reset';

/** What a confirmation dialog is built from. */
export interface TurnLossPrompt {
	readonly message: string;
	readonly detail: string;
	/** The primary button, spelling the act — and matching the menu label that opened it. */
	readonly confirm: string;
}

const ACT_WORDS: Record<SeatAct, { readonly question: string; readonly confirm: string }> = {
	'place-interactive': { question: 'run', confirm: 'Run Interactively' },
	'place-headless': { question: 'run', confirm: 'Run Headless' },
	'run-stop': { question: 'stop', confirm: 'Stop' },
	'run-resume': { question: 'resume', confirm: 'Resume' },
	'run-reset': { question: 'reset', confirm: 'Reset' },
};

/**
 * The warning Alan meets before an act that costs a seat its turn, or nothing
 * where the act costs nothing.
 *
 * WHY THIS IS NOT IN THE LABEL ANY MORE. These titles used to be whole sentences
 * carrying the warning, which was right while they were hover text: the icon was
 * what Alan saw and the sentence was what hovering revealed. On right-click the
 * title IS the visible label, so the sentences had to go — and the warning could
 * not go with them, because it is conditional on state that one title cannot
 * spell. `placeInteractive` is offered on `seat.running.headless` and
 * `seat.stopped.headless` alike; a label warning of a lost turn lies on the
 * stopped row, and a silent one lies on the running row. Only something evaluated
 * at the moment of the click can tell those apart, so this is evaluated then.
 *
 * IT READS THE PLAN RATHER THAN THE ACT. What is lost is decided by the steps
 * `planRunToggle` and `planPlaceToggle` produced, so a plan that stops reaching
 * for a process stops warning about one, without this being edited to match. That
 * is not hypothetical: the place toggle attaches and detaches now, and went silent
 * here on its own. `state-place`, `revive`, `attach` and `detach` destroy nothing —
 * the first writes a mode, the second starts a seat that was not running, and the
 * last two move a terminal.
 *
 * A STOPPED SEAT IS NEVER WARNED ABOUT A LOST TURN, which is most of the point. It
 * has no turn in progress to lose, so re-placing it and bringing it back both answer
 * nothing here; `run-resume` is offered on stopped rows alone and therefore answers
 * nothing at all.
 *
 * A RESET IS THE ONE ACT A STOPPED SEAT IS WARNED ABOUT, and it is checked before
 * anything asks whether the seat is running. What it destroys is the agent's memory,
 * which a stopped seat still has — so the running check that silences every other act
 * on a stopped row would silence exactly the warning that matters most.
 */
export function confirmTurnLoss(
	act: SeatAct,
	seatName: string,
	state: SeatToggleState,
	steps: readonly SeatStep[]
): TurnLossPrompt | undefined {
	if (steps.some((s) => s.kind === 'reset')) {
		return {
			message: `Are you sure you want to reset '${seatName}'?`,
			detail:
				'This replaces the agent in the seat with a new one. Everything it remembers is lost, along with whatever it is part-way through, and neither can be recovered.',
			confirm: ACT_WORDS['run-reset'].confirm,
		};
	}
	if (!state.running) { return undefined; }
	if (!steps.some((s) => s.kind === 'stop' || s.kind === 'resume-interactive')) { return undefined; }
	const words = ACT_WORDS[act];
	return {
		message: `Are you sure you want to ${words.question} '${seatName}'?`,
		detail:
			act === 'run-stop'
				? 'This kills the process the seat is working in. Whatever it is part-way through this turn is lost and cannot be recovered.'
				: 'This restarts the process the seat is working in. Whatever it is part-way through this turn is lost and cannot be recovered.',
		confirm: words.confirm,
	};
}
