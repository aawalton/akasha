import { describe, expect, test } from 'bun:test';
import { buildObservations, changeKey, isLive, type Observation, OBSERVATIONS_VERSION, observationFor, parseObservations, type SweepObservation, sweepsPayingTheBound, writerOf } from "./observations.ts"
import { foldSweep, mergeObservation } from "./observation-merge.ts";

const HEALTHY: SweepObservation = {
	swept: 18,
	read: 18,
	noProcess: 0,
	neverAnswered: 0,
	boundMs: 5000,
	worstMs: 312,
	worstAt: '2026-08-13T20:00:00.000Z',
	worstTrigger: 'activate',
};

const RECORD = buildObservations({
	writer: 4242,
	writerStartedAt: 46800522,
	writtenAt: '2026-08-13T20:00:00.000Z',
	features: {
		'agent-tree': { at: '2026-08-13T20:00:00.000Z', outcome: 'ok', sweep: HEALTHY },
		'status-bar': { at: '2026-08-13T20:00:00.000Z', outcome: 'ok' },
	},
});

describe('the record round-trips', () => {
	test('parses what it built', () => {
		expect(parseObservations(JSON.parse(JSON.stringify(RECORD)))).toEqual(RECORD);
	});

	test('a version it does not know is not read as if it were this one', () => {
		expect(parseObservations({ ...RECORD, version: OBSERVATIONS_VERSION + 1 })).toBeUndefined();
	});

	test('a shape it does not know is nothing rather than a guess', () => {
		expect(parseObservations({ version: 1, writer: 1 })).toBeUndefined();
		expect(parseObservations('not a record')).toBeUndefined();
	});

	test('a feature that never reported is absent rather than empty', () => {
		expect(observationFor(RECORD, 'agent-tree')?.outcome).toBe('ok');
		expect(observationFor(RECORD, 'transcript')).toBeUndefined();
	});
});

describe('nothing that only says "again" can cause a write', () => {
	test('the same observation at a later time is the same key', () => {
		const early: Observation = { at: '2026-08-13T20:00:00.000Z', outcome: 'ok' };
		const later: Observation = { at: '2026-08-13T23:59:59.000Z', outcome: 'ok' };
		expect(changeKey({ 'status-bar': later })).toBe(changeKey({ 'status-bar': early }));
	});

	test('a sweep whose worst was set at a different moment is the same key', () => {
		const moved = { ...HEALTHY, worstAt: '2026-08-13T21:00:00.000Z' };
		expect(changeKey({ a: { at: 'x', sweep: moved } })).toBe(
			changeKey({ a: { at: 'y', sweep: HEALTHY } })
		);
	});

	test('a poll that found the same thing eight thousand times is one key', () => {
		const keys = new Set<string>();
		for (let poll = 0; poll < 8640; poll += 1) {
			keys.add(changeKey({ 'agent-tree': { at: new Date(poll).toISOString(), sweep: HEALTHY } }));
		}
		expect(keys.size).toBe(1);
	});

	test('a count a feature happened to call `at` is still a count', () => {
		expect(changeKey({ f: { at: 'x', counts: { at: 2 } } })).not.toBe(
			changeKey({ f: { at: 'x', counts: { at: 1 } } })
		);
	});

	test('the same values reported in a different order are the same key', () => {
		const one: Observation = { at: 'x', outcome: 'ok', counts: { a: 1, b: 2 } };
		const other: Observation = { at: 'x', counts: { b: 2, a: 1 }, outcome: 'ok' };
		expect(changeKey({ f: other })).toBe(changeKey({ f: one }));
	});
});

describe('what does move the key', () => {
	test('a terminal that stopped answering', () => {
		const paying = { ...HEALTHY, read: 17, neverAnswered: 1, worstMs: 5301 };
		expect(changeKey({ a: { at: 'x', sweep: paying } })).not.toBe(
			changeKey({ a: { at: 'x', sweep: HEALTHY } })
		);
	});

	test('a count that changed', () => {
		expect(changeKey({ a: { at: 'x', counts: { running: 9 } } })).not.toBe(
			changeKey({ a: { at: 'x', counts: { running: 8 } } })
		);
	});

	test('a feature reporting for the first time', () => {
		expect(changeKey({ a: { at: 'x' }, b: { at: 'x' } })).not.toBe(changeKey({ a: { at: 'x' } }));
	});

	test('a failure arriving, and the same failure again not', () => {
		const broke: Observation = { at: 'x', outcome: 'failed', failure: 'secrets file moved' };
		expect(changeKey({ a: broke })).not.toBe(changeKey({ a: { at: 'x', outcome: 'ok' } }));
		expect(changeKey({ a: { ...broke, at: 'much later' } })).toBe(changeKey({ a: broke }));
	});
});

describe('merging what a feature reports', () => {
	test('a part it did not mention is left where it was', () => {
		const before: Observation = { at: 'x', outcome: 'ok', sweep: HEALTHY };
		expect(mergeObservation(before, { counts: { running: 8 } }, 'y').sweep).toEqual(HEALTHY);
	});

	test('counts merge by name rather than replacing each other', () => {
		const before = mergeObservation(undefined, { counts: { seatTerminals: 7 } }, 'x');
		const after = mergeObservation(before, { counts: { running: 8 } }, 'y');
		expect(after.counts).toEqual({ seatTerminals: 7, running: 8 });
	});

	test('a count that changed is taken, not merged around', () => {
		const before = mergeObservation(undefined, { counts: { running: 8 } }, 'x');
		expect(mergeObservation(before, { counts: { running: 9 } }, 'y').counts).toEqual({ running: 9 });
	});

	test('a key carrying undefined cannot blank what is there', () => {
		const before: Observation = { at: 'x', sweep: HEALTHY };
		expect(mergeObservation(before, { sweep: undefined }, 'y').sweep).toEqual(HEALTHY);
	});

	test('recovering clears the failure it recovered from', () => {
		const broke = mergeObservation(undefined, { outcome: 'failed', failure: 'gone' }, 'x');
		const fixed = mergeObservation(broke, { outcome: 'ok' }, 'y');
		expect(fixed.outcome).toBe('ok');
		expect(fixed.failure).toBeUndefined();
	});

	test('a report that is not about the outcome leaves the failure alone', () => {
		const broke = mergeObservation(undefined, { outcome: 'failed', failure: 'gone' }, 'x');
		expect(mergeObservation(broke, { counts: { n: 1 } }, 'y').failure).toBe('gone');
	});

	test('`at` is whatever the store stamped, never what was there before', () => {
		const before: Observation = { at: 'x', outcome: 'ok' };
		expect(mergeObservation(before, { outcome: 'failed' }, 'y').at).toBe('y');
	});
});

describe('a sweep folded against what the window has seen', () => {
	const now = { swept: 3, read: 3, noProcess: 0, neverAnswered: 0, boundMs: 5000 };

	test('the first sweep is its own worst', () => {
		const folded = foldSweep(undefined, { ...now, ms: 240, at: 'a', trigger: 'activate' });
		expect(folded.worstMs).toBe(240);
		expect(folded.worstTrigger).toBe('activate');
	});

	test('a slower sweep takes the mark, with when and what triggered it', () => {
		const first = foldSweep(undefined, { ...now, ms: 240, at: 'a', trigger: 'activate' });
		const worse = foldSweep(first, { ...now, ms: 5301, at: 'b', trigger: 'poll' });
		expect(worse.worstMs).toBe(5301);
		expect(worse.worstAt).toBe('b');
		expect(worse.worstTrigger).toBe('poll');
	});

	test('a faster sweep does not erase the mark, and does replace the counts', () => {
		const bad = foldSweep(undefined, {
			...now,
			read: 2,
			neverAnswered: 1,
			ms: 5301,
			at: 'b',
			trigger: 'poll',
		});
		const healthy = foldSweep(bad, { ...now, ms: 240, at: 'c', trigger: 'poll' });
		expect(healthy.worstMs).toBe(5301);
		expect(healthy.worstAt).toBe('b');
		expect(healthy.neverAnswered).toBe(0);
		expect(healthy.read).toBe(3);
	});

	test('a healthy window folded all day writes one key', () => {
		let sweep = foldSweep(undefined, { ...now, ms: 300, at: 'a', trigger: 'activate' });
		const first = changeKey({ 'agent-tree': { at: 'a', sweep } });
		for (let poll = 0; poll < 500; poll += 1) {
			sweep = foldSweep(sweep, { ...now, ms: 200 + (poll % 90), at: `t${poll}`, trigger: 'poll' });
		}
		expect(changeKey({ 'agent-tree': { at: 'z', sweep } })).toBe(first);
	});
});

describe('what a verifier asks the record', () => {
	test('#18954: which sweeps paid their whole bound', () => {
		expect(sweepsPayingTheBound(RECORD)).toEqual([]);
		const paying = buildObservations({
			...RECORD,
			features: {
				'agent-tree': { at: 'x', sweep: { ...HEALTHY, read: 11, neverAnswered: 7 } },
				'terminal-rename': { at: 'x', sweep: HEALTHY },
				'status-bar': { at: 'x', outcome: 'ok' },
			},
		});
		expect(sweepsPayingTheBound(paying)).toEqual(['agent-tree']);
	});

	test('a record a dead window left behind is not read as a live one', () => {
		expect(isLive(RECORD, (w) => w.pid === 4242)).toBe(true);
		expect(isLive(RECORD, () => false)).toBe(false);
	});

	test('the liveness question is asked about a run, not a number', () => {
		expect(writerOf(RECORD)).toEqual({ pid: 4242, startedAt: 46800522 });
	});
});
