import { describe, expect, test } from 'bun:test';
import { makeStore, ORIGIN, service } from './observation-store-fixtures.ts';

describe('a write that did not reach the page is still owed', () => {
	test('a write that landed is not sent a second time', async () => {
		const { store, sent } = makeStore();
		store.record('agent-tree', { counts: { running: 8 } });
		await store.flush();
		await store.flush();

		expect(sent).toHaveLength(1);
	});

	test('a refusal leaves the observation owed, and it goes again', async () => {
		const pages = service();
		const told: string[] = [];
		const { store, sent } = makeStore({ service: pages, onError: (m) => told.push(m) });
		pages.refuse(400);
		store.record('agent-tree', { counts: { running: 8 } });
		await store.flush();
		expect(sent).toHaveLength(1);
		expect(told).toHaveLength(1);

		pages.accept();
		await store.flush();

		expect(sent).toHaveLength(2);
		expect(sent[1]?.features['agent-tree']?.counts).toEqual({ running: 8 });
	});

	test('and so does a request that never answered at all', async () => {
		const pages = service();
		const told: string[] = [];
		const { store, sent } = makeStore({ service: pages, onError: (m) => told.push(m) });
		pages.goSilent();
		store.record('agent-tree', { counts: { running: 8 } });
		await store.flush();
		expect(sent).toHaveLength(1);
		expect(told).toHaveLength(1);

		pages.accept();
		await store.flush();

		expect(sent).toHaveLength(2);
		expect(sent[1]?.features['agent-tree']?.counts).toEqual({ running: 8 });
	});
});

describe('two live windows are two pages', () => {
	test('each window writes to the page named for it, carrying its own observations', async () => {
		const pages = service();
		const first = makeStore({ service: pages, window: '1001.500' });
		const second = makeStore({ service: pages, window: '2002.900' });

		first.store.record('agent-tree', { counts: { running: 8 } });
		second.store.record('agent-tree', { counts: { running: 3 } });
		await first.store.flush();
		await second.store.flush();

		expect(pages.sent).toHaveLength(2);
		expect(pages.sent.map((one) => one.url)).toEqual([
			`${ORIGIN}/patch-state/code-editor-window/1001.500`,
			`${ORIGIN}/patch-state/code-editor-window/2002.900`,
		]);
		expect(pages.sent[0]?.features['agent-tree']?.counts).toEqual({ running: 8 });
		expect(pages.sent[1]?.features['agent-tree']?.counts).toEqual({ running: 3 });
	});

	test('and one window\'s writes do not settle the other\'s', async () => {
		const pages = service();
		const first = makeStore({ service: pages, window: '1001.500' });
		const second = makeStore({ service: pages, window: '2002.900' });

		first.store.record('agent-tree', { counts: { running: 8 } });
		await first.store.flush();
		second.store.record('agent-tree', { counts: { running: 8 } });
		await second.store.flush();

		expect(pages.sent).toHaveLength(2);
		expect(pages.sent[1]?.url).toBe(`${ORIGIN}/patch-state/code-editor-window/2002.900`);
	});
});

describe('reporting with no store set up', () => {
	test('a feature that reports before anything exists is not harmed by it', async () => {
		const { recordObservation, recordSweep, currentObservation, setObservationStore } =
			await import('./observation-store.ts');
		setObservationStore(undefined);
		expect(() => recordObservation('agent-tree', { outcome: 'ok' })).not.toThrow();
		expect(() =>
			recordSweep('agent-tree', {
				swept: 1,
				read: 1,
				noProcess: 0,
				neverAnswered: 0,
				boundMs: 5000,
				ms: 1,
				trigger: 'x',
			})
		).not.toThrow();
		expect(currentObservation('agent-tree')).toBeUndefined();
	});
});
