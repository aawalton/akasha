import { describe, expect, test } from 'bun:test';
import { type AgentNode, assembleForest, countRunning } from "./forest.ts"
import { ancestorNames, readSeatPlaces } from "./lookup.ts";
import { NO_PLACES, NO_SUBAGENTS, row, subagent } from './forest-fixtures.ts';
import type { HarnessRow } from './harness.ts';

describe('countRunning', () => {
	test('counts live seats and subagents alike, at every depth', () => {
		const rows = [row('a', 'lead', null), row('b', 'worker', 'a')];
		const subagents = new Map([['a', [subagent('t1', 'outer', [subagent('t2', 'inner')])]]]);
		expect(countRunning(assembleForest(rows, new Set(['a', 'b']), subagents, NO_PLACES))).toBe(4);
	});

	test('does not count a stopped seat standing only to hold a running one', () => {
		const rows = [row('a', 'stopped-opener', null), row('b', 'running-child', 'a')];
		expect(countRunning(assembleForest(rows, new Set(['b']), NO_SUBAGENTS, NO_PLACES))).toBe(1);
	});

	test('is zero where nothing is running', () => {
		expect(countRunning([])).toBe(0);
	});
});

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

	test('keeps its state and no colour where the harness answered none', () => {
		expect(firstSubagent().state).toBe('working');
		expect(firstSubagent().colour).toBeUndefined();
	});
});
