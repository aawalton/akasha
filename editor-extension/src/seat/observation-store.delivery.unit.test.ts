/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import { makeStore, ORIGIN, service } from './observation-store-fixtures';

/**
 * THE KEY IS NOT ADVANCED ON A FAILED WRITE.
 *
 * The store skips a write whose observations match what the page already holds, so
 * a write counted as done when it was not is a record that stays wrong until
 * something else happens to change — silently, and for the life of the window.
 * The first case here is the negative control for the two after it: without it, a
 * `flush` that always sent would make them both pass.
 */
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
		// One service, two windows. The record used to be keyed on
		// `vscode.env.sessionId`, which is the constant `someValue.sessionId` in every
		// served instance of this fork — so two live windows wrote one record that
		// described neither, and every liveness check passed while it did.
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
		// The same observation from the other window is a write of its own: the two
		// stores share nothing, so neither can silence the other.
		second.store.record('agent-tree', { counts: { running: 8 } });
		await second.store.flush();

		expect(pages.sent).toHaveLength(2);
		expect(pages.sent[1]?.url).toBe(`${ORIGIN}/patch-state/code-editor-window/2002.900`);
	});
});

describe('reporting with no store set up', () => {
	test('a feature that reports before anything exists is not harmed by it', async () => {
		// The suite runs these modules with no store, and a feature must never be able
		// to fail because the recorder was not there yet.
		const { recordObservation, recordSweep, currentObservation, setObservationStore } =
			await import('./observation-store');
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
