import type { SeatStep, SeatToggleState } from './toggles.ts';

export type SeatAct =
	| 'place-interactive'
	| 'place-headless'
	| 'run-stop'
	| 'run-resume'
	| 'run-reset';

export interface TurnLossPrompt {
	readonly message: string;
	readonly detail: string;
	readonly confirm: string;
}

const ACT_WORDS: Record<SeatAct, { readonly question: string; readonly confirm: string }> = {
	'place-interactive': { question: 'run', confirm: 'Run Interactively' },
	'place-headless': { question: 'run', confirm: 'Run Headless' },
	'run-stop': { question: 'stop', confirm: 'Stop' },
	'run-resume': { question: 'resume', confirm: 'Resume' },
	'run-reset': { question: 'reset', confirm: 'Reset' },
};

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
