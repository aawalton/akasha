/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import { type AgentNode, ancestorNames, assembleForest, countRunning, readSeatPlaces } from './forest';
import { NO_PLACES, NO_SUBAGENTS, row, subagent } from './forest-fixtures';
import type { HarnessRow } from './harness';

describe('countRunning', () => {
	// The header's number, counted off the assembled tree so it cannot disagree with
	// the rows underneath it.
	test('counts live seats and subagents alike, at every depth', () => {
		const rows = [row('a', 'lead', null), row('b', 'worker', 'a')];
		const subagents = new Map([['a', [subagent('t1', 'outer', [subagent('t2', 'inner')])]]]);
		expect(countRunning(assembleForest(rows, new Set(['a', 'b']), subagents, NO_PLACES))).toBe(4);
	});

	// A stopped seat is on screen to hold the branch beneath it. It is not working,
	// so a header counting rows rather than running agents would overstate the fleet.
	test('does not count a stopped seat standing only to hold a running one', () => {
		const rows = [row('a', 'stopped-opener', null), row('b', 'running-child', 'a')];
		expect(countRunning(assembleForest(rows, new Set(['b']), NO_SUBAGENTS, NO_PLACES))).toBe(1);
	});

	test('is zero where nothing is running', () => {
		expect(countRunning([])).toBe(0);
	});
});

// The click walks this list looking for the first ancestor with a terminal in
// the window, so the ORDER is load-bearing rather than cosmetic: a wrong order
// sends a headless seat's transcript to the root's column instead of the
// interactive seat's, which is a legal-looking answer to the wrong question.
// Depth beyond two is not reachable in today's fleet, so this is where it is
// measured at all.
describe('ancestorNames', () => {
	const deep = assembleForest(
		[
			row('a', 'alan-seat', null),
			row('b', 'lead', 'a'),
			row('c', 'worker', 'b'),
			row('d', 'subagent-seat', 'c'),
		],
		new Set(['a', 'b', 'c', 'd']),
		NO_SUBAGENTS,
		NO_PLACES
	);

	test('names every ancestor nearest first', () => {
		expect(ancestorNames(deep, 'd')).toEqual(['worker', 'lead', 'alan-seat']);
	});

	test('gives a root no ancestors', () => {
		expect(ancestorNames(deep, 'a')).toEqual([]);
	});

	test('gives a seat that is not in the forest no ancestors', () => {
		expect(ancestorNames(deep, 'absent')).toEqual([]);
	});

	test('walks the branch the seat is on rather than any other', () => {
		const branched = assembleForest(
			[
				row('a', 'alan-seat', null),
				row('b', 'left-lead', 'a'),
				row('c', 'right-lead', 'a'),
				row('d', 'worker', 'c'),
			],
			new Set(['a', 'b', 'c', 'd']),
			NO_SUBAGENTS,
			NO_PLACES
		);
		expect(ancestorNames(branched, 'd')).toEqual(['right-lead', 'alan-seat']);
	});
});

describe('readSeatPlaces', () => {
	// THE CASE THE ROW'S `launch` GETS WRONG, and the reason the place is read off
	// `mode` alone. `launch` says `opened` for every seat whose page names a person,
	// whatever place that seat runs in, so a headless seat of Alan's reads as opened
	// — and a place taken from it would send this seat's bring-back to `sr` in a
	// terminal instead of to `ops seat resume`.
	test('reads the place off the stated mode rather than off launch', () => {
		const stopped: HarnessRow = {
			id: 'a',
			name: 'amy-code-editor-worker',
			parent_agent_id: null,
			principal: 'alan',
			launch: 'opened',
			mode: 'headless',
			live: false,
			state: 'stopped',
			waitingOn: null,
			colour: null,
		};
		expect(readSeatPlaces([stopped]).get('a')).toBe('headless');
	});
});

/**
 * What a subagent row says about its turn.
 *
 * WHAT ELSE WOULD CATCH THIS. Nothing. A subagent left without a state draws in the muted
 * foreground, which is what it drew in for as long as it had none — so the regression is a row
 * that looks exactly like the version before the change, on a panel where the muted rows are the
 * ones a reader has been trained to skip.
 */
describe('a subagent takes a turn of its own', () => {
	const subagents = new Map([['a', [subagent('t1', 'outer', [subagent('t2', 'inner')])]]]);

	function firstSubagent(colour?: string): AgentNode {
		const [seat] = assembleForest([row('a', 'lead', null)], new Set(['a']), subagents, NO_PLACES, colour);
		const [child] = seat?.children ?? [];
		if (child === undefined) { throw new Error('the seat carried no subagent'); }
		return child;
	}

	test('stands as working, its turn ending only by returning to the seat that ran it', () => {
		expect(firstSubagent('green').state).toBe('working');
	});

	test('is drawn in the colour a working agent is drawn in', () => {
		expect(firstSubagent('green').colour).toBe('green');
	});

	test('carries the colour down its own subagents, which are working for the same reason', () => {
		const [deeper] = firstSubagent('green').children;
		expect(deeper?.colour).toBe('green');
		expect(deeper?.state).toBe('working');
	});

	test('waits on nothing, a subagent never being idle and so never pending', () => {
		expect(firstSubagent('green').waitingOn).toBeUndefined();
	});

	// The fallback. A harness that could not be reached costs the subagents their colour and
	// costs the tree nothing else.
	test('keeps its state and no colour where the harness answered none', () => {
		expect(firstSubagent().state).toBe('working');
		expect(firstSubagent().colour).toBeUndefined();
	});
});
