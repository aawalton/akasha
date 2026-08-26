/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * What a burst of writes costs the panels above this.
 *
 * THE THING BEING ASSERTED IS AN ABSENCE, which is why it is asserted here rather than looked for
 * on screen. A watcher wired straight to a whole-corpus read looks correct in every way Alan can
 * see — the tree is right, the counts are right — and the only symptom is subprocesses. So the
 * count of reads is the measurement, and these hold it against the two cases that produce them:
 * many writes arriving together, and a write arriving while a read is already running.
 */
import { describe, expect, test } from 'bun:test';
import { createSettledRefresh } from './settled-refresh';

const SETTLE_MS = 20;

function sleep(ms: number): Promise<undefined> {
	return new Promise((resolve) => setTimeout(() => resolve(undefined), ms));
}

/** A read that records what it was asked for, and takes as long as it is told to. */
function recorder(ms = 0): {
	readonly triggers: string[];
	readonly run: (trigger: string) => Promise<undefined>;
} {
	const triggers: string[] = [];
	return {
		triggers,
		run: async (trigger: string) => {
			triggers.push(trigger);
			if (ms > 0) { await sleep(ms); }
			return undefined;
		},
	};
}

describe('createSettledRefresh', () => {
	test('a burst of requests is one read, taken after the writing stops', async () => {
		const { triggers, run } = recorder();
		const settled = createSettledRefresh(SETTLE_MS, run);
		// A commit landing forty documents, which is the case this exists for.
		for (let at = 0; at < 40; at += 1) { settled.request('written'); }
		expect(triggers).toEqual([]);
		await sleep(SETTLE_MS * 3);
		expect(triggers).toEqual(['written']);
		settled.dispose();
	});

	test('the wait restarts on each request, so a read waits out writing that goes on', async () => {
		const { triggers, run } = recorder();
		const settled = createSettledRefresh(SETTLE_MS, run);
		// Kept just under the settling time apart, so nothing should have read yet even though
		// more than a settling time has passed since the first request.
		for (let at = 0; at < 4; at += 1) {
			settled.request('written');
			await sleep(SETTLE_MS / 2);
		}
		expect(triggers).toEqual([]);
		await sleep(SETTLE_MS * 3);
		expect(triggers).toEqual(['written']);
		settled.dispose();
	});

	test('a request arriving mid-read runs once that read is done, never beside it', async () => {
		// Long enough that the requests below all land while the first read is still running.
		const { triggers, run } = recorder(SETTLE_MS * 6);
		const settled = createSettledRefresh(SETTLE_MS, run);
		settled.request('added');
		await sleep(SETTLE_MS * 2);
		expect(triggers).toEqual(['added']);
		// Three more changes while that read is in flight. They are one follow-up, not three, and
		// none of them starts while the first is running.
		settled.request('removed');
		await sleep(SETTLE_MS * 2);
		settled.request('removed');
		expect(triggers).toEqual(['added']);
		await sleep(SETTLE_MS * 10);
		expect(triggers).toEqual(['added', 'removed']);
		settled.dispose();
	});

	test('a read that throws does not stop the next one', async () => {
		// The panels catch inside their own refresh, so this never happens there. Asserted because
		// the guard must not depend on that staying true: a settling loop that dies on one failed
		// read leaves a panel that never updates again and says nothing about why.
		const triggers: string[] = [];
		const settled = createSettledRefresh(SETTLE_MS, async (trigger: string) => {
			triggers.push(trigger);
			if (triggers.length === 1) { throw new Error('the harness could not be reached'); }
			return undefined;
		});
		settled.request('written');
		await sleep(SETTLE_MS * 3);
		expect(triggers).toEqual(['written']);
		settled.request('written');
		await sleep(SETTLE_MS * 3);
		expect(triggers).toEqual(['written', 'written']);
		settled.dispose();
	});

	test('disposing drops a request that has not been read yet', async () => {
		const { triggers, run } = recorder();
		const settled = createSettledRefresh(SETTLE_MS, run);
		settled.request('written');
		settled.dispose();
		await sleep(SETTLE_MS * 3);
		expect(triggers).toEqual([]);
	});
});
