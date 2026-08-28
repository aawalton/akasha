import { describe, expect, test } from 'bun:test';
import { planPlaceToggle, planReset, planRunToggle, attachCommandLine, seatNameAccepted, type SeatStep, type SeatToggleState } from "./toggles.ts"
import { confirmTurnLoss, type SeatAct } from "./confirm.ts";

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

	test('brings a seat back in the place it is in', () => {
		expect(kinds(planRunToggle({ running: false, place: 'headless' }))).toEqual(['revive']);
		expect(kinds(planRunToggle({ running: false, place: 'interactive' }))).toEqual([
			'resume-interactive',
		]);
	});

	test('never states a place', () => {
		for (const state of STATES) {
			expect(kinds(planRunToggle(state))).not.toContain('state-place');
		}
	});
});

describe('planPlaceToggle', () => {
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

	test('detaches a running seat to send it headless', () => {
		expect(kinds(planPlaceToggle({ running: true, place: 'interactive' }))).toEqual([
			'state-place',
			'detach',
		]);
	});

	test('attaches a terminal to bring a running seat into view', () => {
		expect(kinds(planPlaceToggle({ running: true, place: 'headless' }))).toEqual([
			'state-place',
			'attach',
		]);
	});

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
	test('attaches a terminal to the new agent in an interactive seat', () => {
		for (const running of [true, false]) {
			expect(kinds(planReset({ running, place: 'interactive' }))).toEqual(['reset', 'attach']);
		}
	});

	test('opens no terminal for a headless seat', () => {
		for (const running of [true, false]) {
			expect(kinds(planReset({ running, place: 'headless' }))).toEqual(['reset']);
		}
	});

	test('replaces the agent whether or not the seat is running', () => {
		for (const state of STATES) {
			expect(kinds(planReset(state))).toContain('reset');
		}
	});

	test('never states a place', () => {
		for (const state of STATES) {
			expect(kinds(planReset(state))).not.toContain('state-place');
		}
	});
});

describe('confirmTurnLoss', () => {
	const RUNNING: SeatToggleState = { running: true, place: 'headless' };

	test('warns before the act that costs a running seat its turn', () => {
		const prompt = confirmTurnLoss('run-stop', 'abby', RUNNING, planRunToggle(RUNNING));
		expect(prompt).toBeDefined();
		expect(prompt?.detail).toMatch(/lost and cannot be recovered/);
		expect(prompt?.detail).toMatch(/this turn/);
		expect(prompt?.message).toContain('abby');
		expect(prompt?.confirm.length).toBeGreaterThan(0);
	});

	test('says nothing before moving a running seat between places', () => {
		const acts: readonly [SeatAct, SeatToggleState][] = [
			['place-interactive', { running: true, place: 'headless' }],
			['place-headless', { running: true, place: 'interactive' }],
		];
		for (const [act, state] of acts) {
			expect(confirmTurnLoss(act, 'abby', state, planPlaceToggle(state))).toBeUndefined();
		}
	});

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

	test('warns before resetting a stopped seat', () => {
		for (const place of ['interactive', 'headless'] as const) {
			const state: SeatToggleState = { running: false, place };
			const prompt = confirmTurnLoss('run-reset', 'abby', state, planReset(state));
			expect(prompt).toBeDefined();
			expect(prompt?.message).toContain('abby');
			expect(prompt?.confirm.length).toBeGreaterThan(0);
		}
	});

	test('says the memory is lost rather than only the turn', () => {
		const prompt = confirmTurnLoss('run-reset', 'abby', RUNNING, planReset(RUNNING));
		expect(prompt?.detail).toMatch(/remembers|memory/);
		expect(prompt?.detail).toMatch(/lost/);
		expect(prompt?.detail).toMatch(/recovered/);
		expect(prompt?.detail).not.toBe(
			confirmTurnLoss('run-stop', 'abby', RUNNING, planRunToggle(RUNNING))?.detail
		);
	});

	test('says nothing where the plan touches no process', () => {
		expect(
			confirmTurnLoss('place-headless', 'abby', RUNNING, [{ kind: 'state-place', place: 'headless' }])
		).toBeUndefined();
	});
});

describe('seatNameAccepted', () => {
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

	test.each(['3055-worker', '6060-worker', '17597-memory-developer', '0-code-editor-worker'])(
		'accepts %s, which opens with a digit',
		(name) => {
			expect(seatNameAccepted(name)).toBe(true);
		}
	);

	test.each(['-worker', '--no-tmux', '-'])('refuses %s, which would be read as a flag', (name) => {
		expect(seatNameAccepted(name)).toBe(false);
	});

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
	test('attaches to a session and starts nothing', () => {
		const line = attachCommandLine('17597-memory-developer');
		expect(line).toBe('tmux attach-session -t "=17597-memory-developer"');
		expect(line).not.toMatch(/\bsr\b|resume|new-session/);
	});

	test('anchors the name so a prefix cannot match its neighbour', () => {
		expect(attachCommandLine('3055-worker')).toContain('"=3055-worker"');
	});

	test('throws naming what a seat name must be', () => {
		expect(() => attachCommandLine('Amy Worker')).toThrow(
			/lower-case letters, digits and hyphens, opening with a letter or a digit/
		);
	});
});
