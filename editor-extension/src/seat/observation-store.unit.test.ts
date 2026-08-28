import { describe, expect, test } from 'bun:test';
import { makeStore, ORIGIN, WINDOW } from './observation-store-fixtures.ts';

describe('the window\'s page carries what its features observed', () => {
	test('the first observation is sent to this window\'s page and no other', async () => {
		const { store, sent } = makeStore();
		store.record('agent-tree', { outcome: 'ok', counts: { running: 8 } });
		await store.flush();

		expect(sent).toHaveLength(1);
		expect(sent[0]?.url).toBe(`${ORIGIN}/patch-state/code-editor-window/${WINDOW}`);
		expect(sent[0]?.writer).toBe('editor-observations');
	});

	test('the features go with their shape intact, rather than flattened or stringified', async () => {
		const { store, sent } = makeStore();
		store.record('agent-tree', { outcome: 'ok', counts: { running: 8, idle: 2 } });
		await store.flush();

		expect(sent[0]?.features['agent-tree']?.outcome).toBe('ok');
		expect(sent[0]?.features['agent-tree']?.counts).toEqual({ running: 8, idle: 2 });
	});

	test('and the page is told when the window last reported', async () => {
		const { store, sent } = makeStore();
		store.record('agent-tree', { outcome: 'ok' });
		await store.flush();

		expect(sent[0]?.observedAt).toMatch(/^2026-08-13T20:00:\d\d\.000Z$/);
	});

	test('nothing is sent before anything is observed', async () => {
		const { store, sent } = makeStore();
		await store.flush();
		expect(sent).toHaveLength(0);
	});
});

describe('a window nobody is verifying pays nothing it would notice', () => {
	test('a poll that found the same thing sends nothing at all', async () => {
		const { store, sent } = makeStore();
		store.record('status-bar', { outcome: 'ok', counts: { failedReads: 0 } });
		await store.flush();

		for (let poll = 0; poll < 17_280; poll += 1) {
			store.record('status-bar', { outcome: 'ok', counts: { failedReads: 0 } });
		}
		await store.flush();

		expect(sent).toHaveLength(1);
	});

	test('and the record still says what it said', async () => {
		const { store, sent } = makeStore();
		store.record('agent-tree', { outcome: 'ok', counts: { running: 8 } });
		await store.flush();
		for (let poll = 0; poll < 500; poll += 1) {
			store.record('agent-tree', { outcome: 'ok', counts: { running: 8 } });
		}
		await store.flush();

		expect(sent).toHaveLength(1);
		expect(sent[0]?.features['agent-tree']?.counts).toEqual({ running: 8 });
	});

	test('an unchanged report does not even move the `at` it would be stamped with', async () => {
		const { store, sent } = makeStore();
		store.record('agent-tree', { outcome: 'ok' });
		await store.flush();
		const stamped = sent[0]?.features['agent-tree']?.at;

		for (let poll = 0; poll < 5; poll += 1) {
			store.record('agent-tree', { outcome: 'ok' });
		}
		store.record('status-bar', { outcome: 'ok' });
		await store.flush();

		expect(sent).toHaveLength(2);
		expect(sent[1]?.features['agent-tree']?.at).toBe(stamped);
	});

	test('the same failure arriving over and over is written once', async () => {
		const { store, sent } = makeStore();
		for (let poll = 0; poll < 200; poll += 1) {
			store.record('status-bar', { outcome: 'failed', failure: 'secrets file moved' });
		}
		await store.flush();
		expect(sent).toHaveLength(1);

		for (let poll = 0; poll < 200; poll += 1) {
			store.record('status-bar', { outcome: 'failed', failure: 'secrets file moved' });
		}
		await store.flush();
		expect(sent).toHaveLength(1);
	});
});

describe('through the timer rather than through flush', () => {
	const settle = (ms: number): Promise<void> =>
		new Promise((resolve) => setTimeout(resolve, ms));

	test('the first observation goes with nobody flushing anything', async () => {
		const { store, sent } = makeStore({ settleMs: 10 });
		store.record('agent-tree', { outcome: 'ok', counts: { running: 8 } });
		await settle(60);

		expect(sent).toHaveLength(1);
		expect(sent[0]?.features['agent-tree']?.counts).toEqual({ running: 8 });
	});

	test('a hundred identical polls after it send nothing', async () => {
		const { store, sent } = makeStore({ settleMs: 10 });
		store.record('status-bar', { outcome: 'ok', counts: { failedReads: 0 } });
		await settle(60);

		for (let poll = 0; poll < 100; poll += 1) {
			store.record('status-bar', { outcome: 'ok', counts: { failedReads: 0 } });
			if (poll % 10 === 0) { await settle(30); }
		}
		await settle(60);

		expect(sent).toHaveLength(1);
	});

	test('and a poll that found something different still goes', async () => {
		const { store, sent } = makeStore({ settleMs: 10 });
		store.record('status-bar', { outcome: 'ok', counts: { failedReads: 0 } });
		await settle(60);

		store.record('status-bar', { outcome: 'failed', failure: 'secrets file moved' });
		await settle(60);

		expect(sent).toHaveLength(2);
		expect(sent[1]?.features['status-bar']?.failure).toBe('secrets file moved');
	});
});

describe('what does reach the page', () => {
	test('a count that moved', async () => {
		const { store, sent } = makeStore();
		store.record('agent-tree', { outcome: 'ok', counts: { running: 8 } });
		await store.flush();

		store.record('agent-tree', { outcome: 'ok', counts: { running: 9 } });
		await store.flush();

		expect(sent).toHaveLength(2);
		expect(sent[1]?.features['agent-tree']?.counts).toEqual({ running: 9 });
	});

	test('a sweep that started paying its bound', async () => {
		const { store, sent } = makeStore();
		const healthy = { swept: 18, read: 18, noProcess: 0, neverAnswered: 0, boundMs: 5000 };
		store.recordSweep('terminal-rename', { ...healthy, ms: 300, trigger: 'activate' });
		await store.flush();

		store.recordSweep('terminal-rename', {
			...healthy,
			read: 11,
			neverAnswered: 7,
			ms: 5301,
			trigger: 'poll',
		});
		await store.flush();

		expect(sent).toHaveLength(2);
		expect(sent[1]?.features['terminal-rename']?.sweep?.neverAnswered).toBe(7);
		expect(sent[1]?.features['terminal-rename']?.sweep?.worstMs).toBe(5301);
	});

	test('a feature reporting for the first time, beside the ones already there', async () => {
		const { store, sent } = makeStore();
		store.record('agent-tree', { outcome: 'ok' });
		await store.flush();
		store.record('status-bar', { outcome: 'ok' });
		await store.flush();

		expect(Object.keys(sent[1]?.features ?? {}).sort()).toEqual(['agent-tree', 'status-bar']);
	});
});

describe('a burst costs one write', () => {
	test('eight features activating at once settle into a single record', async () => {
		const { store, sent } = makeStore({ settleMs: 5 });
		for (const feature of [
			'terminal-rename',
			'status-bar',
			'transcript',
			'agent-tree',
			'domain-tree',
			'work-tree',
			'page-tree',
			'editor-layout',
		]) {
			store.record(feature, { activation: { state: 'activated', ms: 300 } });
		}
		await store.flush();

		expect(sent).toHaveLength(1);
		expect(Object.keys(sent[0]?.features ?? {})).toHaveLength(8);
	});

	test('a change and a change back inside one settle sends nothing', async () => {
		const { store, sent } = makeStore({ settleMs: 5 });
		store.record('agent-tree', { counts: { running: 8 } });
		await store.flush();

		store.record('agent-tree', { counts: { running: 9 } });
		store.record('agent-tree', { counts: { running: 8 } });
		await store.flush();

		expect(sent).toHaveLength(1);
	});
});
