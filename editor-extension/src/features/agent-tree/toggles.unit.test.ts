/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import {
	confirmTurnLoss,
	planPlaceToggle,
	planReset,
	planRunToggle,
	attachCommandLine,
	type SeatAct,
	seatNameAccepted,
	type SeatStep,
	type SeatToggleState,
} from './toggles';

const STATES: readonly SeatToggleState[] = [
	{ running: true, place: 'interactive' },
	{ running: true, place: 'headless' },
	{ running: false, place: 'interactive' },
	{ running: false, place: 'headless' },
];

function kinds(steps: readonly SeatStep[]): readonly string[] {
	return steps.map((s) => s.kind);
}

describe('planRunToggle', () => {
	test('stops a running seat, whichever place it is in', () => {
		expect(kinds(planRunToggle({ running: true, place: 'headless' }))).toEqual(['stop']);
		expect(kinds(planRunToggle({ running: true, place: 'interactive' }))).toEqual(['stop']);
	});

	// The run toggle READS the place rather than choosing one. Bringing every seat
	// back through `revive` would land Alan's own interactive seats in a detached
	// headless supervisor — the row would say running and the seat would not be
	// anywhere he could talk to it.
	test('brings a seat back in the place it is in', () => {
		expect(kinds(planRunToggle({ running: false, place: 'headless' }))).toEqual(['revive']);
		expect(kinds(planRunToggle({ running: false, place: 'interactive' }))).toEqual([
			'resume-interactive',
		]);
	});

	// THE TWO TOGGLES ARE TWO. The run toggle changing the place is what merging them
	// into one destination picker would look like from the outside, and it is the
	// thing Alan was explicit should not happen.
	test('never states a place', () => {
		for (const state of STATES) {
			expect(kinds(planRunToggle(state))).not.toContain('state-place');
		}
	});
});

describe('planPlaceToggle', () => {
	// The other half of the same invariant: the place toggle moves the seat and
	// leaves whether it runs alone.
	test('starts and stops nothing for a stopped seat', () => {
		expect(planPlaceToggle({ running: false, place: 'headless' })).toEqual([
			{ kind: 'state-place', place: 'interactive' },
		]);
		expect(planPlaceToggle({ running: false, place: 'interactive' })).toEqual([
			{ kind: 'state-place', place: 'headless' },
		]);
	});

	test('moves a seat to the other place, from either side', () => {
		for (const state of STATES) {
			const [first] = planPlaceToggle(state);
			expect(first).toEqual({
				kind: 'state-place',
				place: state.place === 'interactive' ? 'headless' : 'interactive',
			});
		}
	});

	// Going headless closes the terminal and leaves the session running. A plan that stopped and
	// revived instead would replace the agent, which is what this toggle used to do.
	test('detaches a running seat to send it headless', () => {
		expect(kinds(planPlaceToggle({ running: true, place: 'interactive' }))).toEqual([
			'state-place',
			'detach',
		]);
	});

	// Going interactive attaches a terminal to the session already running.
	test('attaches a terminal to bring a running seat into view', () => {
		expect(kinds(planPlaceToggle({ running: true, place: 'headless' }))).toEqual([
			'state-place',
			'attach',
		]);
	});

	// CHANGING WHERE A SEAT RUNS LEAVES THE AGENT IN IT UNTOUCHED. A seat is a tmux session and
	// the agent works inside it either way, so moving between places is attaching and detaching.
	// A plan reaching for any of these would cost Alan the turn he was only trying to look at.
	test('never touches the process, whichever way it moves the seat', () => {
		for (const state of STATES) {
			const steps = kinds(planPlaceToggle(state));
			expect(steps).not.toContain('stop');
			expect(steps).not.toContain('revive');
			expect(steps).not.toContain('resume-interactive');
		}
	});
});

describe('planReset', () => {
	// `ops seat reset` starts the new agent detached under the seat's own name, on the same
	// reasoning the resume path follows, so the terminal is a window onto a session already
	// running rather than the thing that started it.
	test('attaches a terminal to the new agent in an interactive seat', () => {
		for (const running of [true, false]) {
			expect(kinds(planReset({ running, place: 'interactive' }))).toEqual(['reset', 'attach']);
		}
	});

	// A HEADLESS SEAT WANTS NO TERMINAL, and one opened here would leave the seat sitting in a
	// place its own row says it is not in — the disagreement the place toggle exists to prevent.
	test('opens no terminal for a headless seat', () => {
		for (const running of [true, false]) {
			expect(kinds(planReset({ running, place: 'headless' }))).toEqual(['reset']);
		}
	});

	// IT IS THE SAME PLAN ON A STOPPED SEAT. What a reset replaces is the agent, and a stopped
	// seat still holds one, so there is nothing here for the run state to decide.
	test('replaces the agent whether or not the seat is running', () => {
		for (const state of STATES) {
			expect(kinds(planReset(state))).toContain('reset');
		}
	});

	// A reset changes which agent is in the seat and never where the seat runs. Stating a place
	// here is what a third destination picker would look like from the outside.
	test('never states a place', () => {
		for (const state of STATES) {
			expect(kinds(planReset(state))).not.toContain('state-place');
		}
	});
});

/**
 * WHERE THE RESTART-OR-KILL WARNING WENT. It used to live inside the four command
 * titles, and `menus.unit.test.ts` used to assert it was there. On right-click a
 * title is the visible label rather than hover text, so the labels are short now
 * and the warning is raised at the moment of the click instead. These are the
 * assertions that took over from that one.
 */
describe('confirmTurnLoss', () => {
	const RUNNING: SeatToggleState = { running: true, place: 'headless' };

	// Stopping is the one act left that costs a running seat its turn, and the warning says what
	// is actually at stake — the turn, not merely the process.
	test('warns before the act that costs a running seat its turn', () => {
		const prompt = confirmTurnLoss('run-stop', 'abby', RUNNING, planRunToggle(RUNNING));
		expect(prompt).toBeDefined();
		expect(prompt?.detail).toMatch(/lost and cannot be recovered/);
		expect(prompt?.detail).toMatch(/this turn/);
		expect(prompt?.message).toContain('abby');
		expect(prompt?.confirm.length).toBeGreaterThan(0);
	});

	// THE PLACE ACTS WENT SILENT ON THEIR OWN, which is what reading the plan buys. Neither
	// attaches nor detaches touches a process, so a dialog here would warn about something that
	// does not happen — and this passing is the same claim the plan tests make, read from the
	// other end.
	test('says nothing before moving a running seat between places', () => {
		const acts: readonly [SeatAct, SeatToggleState][] = [
			['place-interactive', { running: true, place: 'headless' }],
			['place-headless', { running: true, place: 'interactive' }],
		];
		for (const [act, state] of acts) {
			expect(confirmTurnLoss(act, 'abby', state, planPlaceToggle(state))).toBeUndefined();
		}
	});

	// A STOPPED SEAT HAS NO TURN TO LOSE, which is the correction this whole
	// function turns on. `planPlaceToggle` starts and kills nothing for one, so
	// re-placing it is silent — and a dialog raised there would be a warning about
	// something that does not happen, which teaches Alan to click through them.
	//
	// BRINGING A SEAT BACK IS COVERED HERE AND ONLY HERE, because a stopped row is
	// the only row it is offered on: its `when` clause is `seat.stopped.`, which
	// `menus.unit.test.ts` holds. Its old title matched the retired `/restart|kill/i`
	// assertion on the word "restarts" used to describe a benefit — that assertion
	// was holding a word rather than a claim, and this holds the claim.
	//
	// EVERY ACT NAMED HERE KEEPS THE AGENT, which is what bounds the claim. A reset destroys
	// the memory a stopped seat still holds, so it warns on one; the two cases below are what
	// hold it apart from these.
	test('says nothing before an act that keeps the agent on a stopped seat', () => {
		for (const place of ['interactive', 'headless'] as const) {
			const state: SeatToggleState = { running: false, place };
			expect(confirmTurnLoss('run-resume', 'abby', state, planRunToggle(state))).toBeUndefined();
			expect(
				confirmTurnLoss('place-interactive', 'abby', state, planPlaceToggle(state))
			).toBeUndefined();
			expect(
				confirmTurnLoss('place-headless', 'abby', state, planPlaceToggle(state))
			).toBeUndefined();
		}
	});

	// A RESET IS THE ONE ACT A STOPPED SEAT IS WARNED ABOUT. The running check that silences
	// every other act on a stopped row would silence this one too, which is why it is asked
	// before that check rather than after it: the agent's memory is what a reset takes, and a
	// stopped seat has all of it.
	test('warns before resetting a stopped seat', () => {
		for (const place of ['interactive', 'headless'] as const) {
			const state: SeatToggleState = { running: false, place };
			const prompt = confirmTurnLoss('run-reset', 'abby', state, planReset(state));
			expect(prompt).toBeDefined();
			expect(prompt?.message).toContain('abby');
			expect(prompt?.confirm.length).toBeGreaterThan(0);
		}
	});

	// AND IT SAYS THE MEMORY IS WHAT GOES. Every other dialog here is about a turn, which a
	// resume brings the seat back from; this one is about everything the agent knew, which
	// nothing brings back. Warning about a turn would understate the one act that cannot be
	// undone, and Alan would read the two as the same question.
	test('says the memory is lost rather than only the turn', () => {
		const prompt = confirmTurnLoss('run-reset', 'abby', RUNNING, planReset(RUNNING));
		expect(prompt?.detail).toMatch(/remembers|memory/);
		expect(prompt?.detail).toMatch(/lost/);
		expect(prompt?.detail).toMatch(/recovered/);
		expect(prompt?.detail).not.toBe(
			confirmTurnLoss('run-stop', 'abby', RUNNING, planRunToggle(RUNNING))?.detail
		);
	});

	// It reads the PLAN rather than the act's name, so a plan that stops reaching
	// for a process stops warning about one without this being edited to match.
	test('says nothing where the plan touches no process', () => {
		expect(
			confirmTurnLoss('place-headless', 'abby', RUNNING, [{ kind: 'state-place', place: 'headless' }])
		).toBeUndefined();
	});
});

describe('seatNameAccepted', () => {
	// One specimen from each family the harness declares a seat name in. A name this refuses is a
	// seat the tree draws a row for and then will not bring back, and the refusal reaches Alan as
	// an error on a click rather than as a greyed-out entry — so the alphabet has to admit every
	// name the corpus can compose, not merely the ones that happen to be seated today.
	test.each([
		'alan-handler',
		'athena',
		'17597-memory-developer',
		'deliver-17320',
		'deliver-17320-2',
		'awen-game-master--the-tower',
		'developer-17320b',
		'amy-calendar',
	])('accepts %s, which the harness declares as a seat name', (name) => {
		expect(seatNameAccepted(name)).toBe(true);
	});

	// A SEAT NAME MAY OPEN WITH A DIGIT. A seat carrying a project number spells that number first,
	// and a domain slug may itself begin with one — `3055` and `6060` are domains under
	// `domains/monarch-accounts/`. Neither is exotic and both compose the ordinary way.
	test.each(['3055-worker', '6060-worker', '17597-memory-developer', '0-code-editor-worker'])(
		'accepts %s, which opens with a digit',
		(name) => {
			expect(seatNameAccepted(name)).toBe(true);
		}
	);

	// A hyphen may not open a name: tmux reads a leading hyphen as an option, so one would be taken
	// as a flag to `attach-session` rather than as the session to attach to.
	test.each(['-worker', '--no-tmux', '-'])('refuses %s, which would be read as a flag', (name) => {
		expect(seatNameAccepted(name)).toBe(false);
	});

	// Nothing shell-active reaches the line. Each of these would be syntax rather than a word if it
	// were ever interpolated bare, and none of them is a name the corpus composes.
	test.each([
		'',
		'a b',
		'a;rm -rf /',
		'a&&b',
		'a|b',
		'a$(id)',
		'a`id`',
		'a>b',
		'a*',
		'a"b',
		'a\'b',
		'a\nb',
		'Amy-worker',
		'a_b',
		'a/b',
	])('refuses %j, which is not a seat name', (name) => {
		expect(seatNameAccepted(name)).toBe(false);
	});
});

describe('attachCommandLine', () => {
	// THE TERMINAL ATTACHES AND DOES NOTHING ELSE. A line that resumed, launched or otherwise
	// started the seat would make the terminal the thing the seat depends on, and closing it
	// would cost Alan the agent rather than the view of it.
	test('attaches to a session and starts nothing', () => {
		const line = attachCommandLine('17597-memory-developer');
		expect(line).toBe('tmux attach-session -t "=17597-memory-developer"');
		expect(line).not.toMatch(/\bsr\b|resume|new-session/);
	});

	// The name is anchored with `=`, so a seat whose name is a prefix of another attaches to its
	// own session rather than to whichever tmux matched first.
	test('anchors the name so a prefix cannot match its neighbour', () => {
		expect(attachCommandLine('3055-worker')).toContain('"=3055-worker"');
	});

	// A refused name throws before the caller opens a terminal, and the message says what a seat
	// name has to be rather than only that this one is not.
	test('throws naming what a seat name must be', () => {
		expect(() => attachCommandLine('Amy Worker')).toThrow(
			/lower-case letters, digits and hyphens, opening with a letter or a digit/
		);
	});
});
