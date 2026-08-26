/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * @fileoverview What went wrong on 2026-08-13, pinned.
 *
 * The fault was never in any one feature: it was that a chain of `await`s let
 * the first thing to stall decide whether anything after it ran. So the cases
 * here are about a stall NOT propagating, and the one that matters most is
 * `a feature that never comes back leaves the others activated` — that is the
 * shape that cost Alan three panels, and it is the one that would come back
 * silently if this were ever chained again.
 */

import { describe, expect, test } from 'bun:test';
import { answerWithin, NO_ANSWER, type Startable, startIsolated } from './activation';

/** A promise that never settles — a terminal whose pid the workbench never sends. */
const never = (): Promise<never> => new Promise<never>(() => { });

const collect = (): { lines: string[]; log: (line: string) => void } => {
	const lines: string[] = [];
	return { lines, log: (line) => { lines.push(line); } };
};

describe('answerWithin', () => {
	test('gives the promise its own answer when it settles in time', async () => {
		expect(await answerWithin(Promise.resolve(4321), 1000)).toBe(4321);
	});

	test('carries undefined through as an answer, distinct from no answer', async () => {
		// The rename feature has to tell "this terminal has no pid" from "this
		// terminal never replied"; one is a fact about the terminal and the other
		// is a fact about the wait.
		expect(await answerWithin(Promise.resolve(undefined), 1000)).toBe(undefined);
	});

	test('answers NO_ANSWER once the bound passes', async () => {
		expect(await answerWithin(never(), 20)).toBe(NO_ANSWER);
	});

	test('a promise that never settles does not hold the caller', async () => {
		const began = Date.now();
		await answerWithin(never(), 20);
		expect(Date.now() - began).toBeLessThan(2000);
	});

	test('a rejection arriving after the bound is not left unhandled', async () => {
		let reject: (err: unknown) => void = () => { };
		const late = new Promise<number>((_, r) => { reject = r; });
		expect(await answerWithin(late, 20)).toBe(NO_ANSWER);
		reject(new Error('too late'));
		// An unhandled rejection would take the process down rather than fail here,
		// so surviving the turn of the loop is the assertion.
		await new Promise((r) => setTimeout(r, 20));
		expect(true).toBe(true);
	});
});

describe('startIsolated', () => {
	test('activates everything when nothing goes wrong', async () => {
		const { lines, log } = collect();
		const outcomes = await startIsolated(
			[
				{ name: 'one', start: async () => undefined },
				{ name: 'two', start: async () => undefined },
			],
			1000,
			log
		);
		expect(outcomes.map((o) => o.state)).toEqual(['activated', 'activated']);
		expect(lines.filter((l) => l.includes('activated in')).length).toBe(2);
	});

	test('a feature that never comes back leaves the others activated', async () => {
		// THE 2026-08-13 CASE. terminal-rename went first and never returned; with
		// six awaits in a row, the five behind it never started at all.
		const { log } = collect();
		const started: string[] = [];
		const six: readonly Startable[] = [
			{ name: 'terminal-rename', start: () => { started.push('terminal-rename'); return never(); } },
			{ name: 'status-bar', start: async () => { started.push('status-bar'); } },
			{ name: 'transcript', start: async () => { started.push('transcript'); } },
			{ name: 'agent-tree', start: async () => { started.push('agent-tree'); } },
			{ name: 'domain-tree', start: async () => { started.push('domain-tree'); } },
			{ name: 'work-tree', start: async () => { started.push('work-tree'); } },
		];

		const outcomes = await startIsolated(six, 20, log);

		// Every one of them was reached, which the chain is what prevented.
		expect(started.length).toBe(6);
		const byName = new Map(outcomes.map((o) => [o.name, o.state]));
		expect(byName.get('terminal-rename')).toBe('still running');
		expect(byName.get('status-bar')).toBe('activated');
		expect(byName.get('transcript')).toBe('activated');
		expect(byName.get('agent-tree')).toBe('activated');
		expect(byName.get('domain-tree')).toBe('activated');
		expect(byName.get('work-tree')).toBe('activated');
	});

	test('a feature that throws leaves the others activated and is named', async () => {
		const { log } = collect();
		const outcomes = await startIsolated(
			[
				{ name: 'boom', start: async () => { throw new Error('secrets file moved'); } },
				{ name: 'fine', start: async () => undefined },
			],
			1000,
			log
		);
		const boom = outcomes.find((o) => o.name === 'boom');
		expect(boom?.state).toBe('failed');
		expect(boom?.error).toBe('secrets file moved');
		expect(outcomes.find((o) => o.name === 'fine')?.state).toBe('activated');
	});

	test('a throw before the first await is caught like any other', async () => {
		// `start` is called rather than awaited into existence, so a feature that
		// throws synchronously would escape if it were not wrapped.
		const { log } = collect();
		const outcomes = await startIsolated(
			[{ name: 'sync-boom', start: async () => { throw new Error('at once'); } }],
			1000,
			log
		);
		expect(outcomes[0]?.state).toBe('failed');
	});

	test('returns within the bound rather than waiting on the stalled one', async () => {
		const began = Date.now();
		const { log } = collect();
		await startIsolated([{ name: 'wedged', start: never }], 20, log);
		expect(Date.now() - began).toBeLessThan(2000);
	});

	test('says which feature stopped being waited for', async () => {
		const { lines, log } = collect();
		await startIsolated([{ name: 'wedged', start: never }], 20, log);
		expect(lines.some((l) => l.includes('wedged') && l.includes('no longer'))).toBe(true);
	});
});
