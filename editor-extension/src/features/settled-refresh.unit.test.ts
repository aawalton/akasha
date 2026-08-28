import { describe, expect, test } from 'bun:test';
import { createSettledRefresh } from './settled-refresh.ts';

const SETTLE_MS = 20;

function sleep(ms: number): Promise<undefined> {
	return new Promise((resolve) => setTimeout(() => resolve(undefined), ms));
}

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
		for (let at = 0; at < 40; at += 1) { settled.request('written'); }
		expect(triggers).toEqual([]);
		await sleep(SETTLE_MS * 3);
		expect(triggers).toEqual(['written']);
		settled.dispose();
	});

	test('the wait restarts on each request, so a read waits out writing that goes on', async () => {
		const { triggers, run } = recorder();
		const settled = createSettledRefresh(SETTLE_MS, run);
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
		const { triggers, run } = recorder(SETTLE_MS * 6);
		const settled = createSettledRefresh(SETTLE_MS, run);
		settled.request('added');
		await sleep(SETTLE_MS * 2);
		expect(triggers).toEqual(['added']);
		settled.request('removed');
		await sleep(SETTLE_MS * 2);
		settled.request('removed');
		expect(triggers).toEqual(['added']);
		await sleep(SETTLE_MS * 10);
		expect(triggers).toEqual(['added', 'removed']);
		settled.dispose();
	});

	test('a read that throws does not stop the next one', async () => {
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
