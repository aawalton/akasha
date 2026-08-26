/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import type { SeatMode } from '../../seat/mode';
import { type AgentNode, assembleForest } from './forest';
import { NO_PLACES, NO_SUBAGENTS, row, subagent } from './forest-fixtures';

function shape(nodes: readonly AgentNode[]): unknown {
	return nodes.map((n) => ({
		name: n.name,
		kind: n.kind,
		live: n.live,
		children: shape(n.children),
	}));
}

describe('assembleForest', () => {
	test('roots the parentless seats and nests each child under its spawner', () => {
		const rows = [
			row('a', 'alan-opened', null),
			row('b', 'worker-one', 'a'),
			row('c', 'worker-two', 'a'),
		];
		expect(shape(assembleForest(rows, new Set(['a', 'b', 'c']), NO_SUBAGENTS, NO_PLACES))).toEqual([
			{
				name: 'alan-opened',
				kind: 'seat',
				live: true,
				children: [
					{ name: 'worker-one', kind: 'seat', live: true, children: [] },
					{ name: 'worker-two', kind: 'seat', live: true, children: [] },
				],
			},
		]);
	});

	// The fleet is two deep today, so an implementation that stopped at two would
	// pass every other test here and be wrong the first time a worker spawns one.
	test('nests to the depth the rows carry rather than stopping at two', () => {
		const rows = [
			row('a', 'root', null),
			row('b', 'child', 'a'),
			row('c', 'grandchild', 'b'),
			row('d', 'great-grandchild', 'c'),
		];
		const forest = assembleForest(rows, new Set(['a', 'b', 'c', 'd']), NO_SUBAGENTS, NO_PLACES);
		let depth = 0;
		for (let node = forest[0]; node !== undefined; node = node.children[0]) { depth++; }
		expect(depth).toBe(4);
	});

	// The stopped ancestor, fetched by id only because something under it runs. The
	// branch has to hang off it rather than being re-rooted or dropped.
	test('marks a seat absent from the live set as not live, keeping its branch', () => {
		const rows = [row('a', 'stopped-opener', null), row('b', 'running-child', 'a')];
		expect(shape(assembleForest(rows, new Set(['b']), NO_SUBAGENTS, NO_PLACES))).toEqual([
			{
				name: 'stopped-opener',
				kind: 'seat',
				live: false,
				children: [{ name: 'running-child', kind: 'seat', live: true, children: [] }],
			},
		]);
	});

	// A parent that could not be fetched must not take its children off the tree
	// with it — the seat is running and has to stay reachable.
	test('roots a seat whose parent is absent rather than dropping it', () => {
		const rows = [row('b', 'orphan', 'missing-parent')];
		expect(shape(assembleForest(rows, new Set(['b']), NO_SUBAGENTS, NO_PLACES))).toEqual([
			{ name: 'orphan', kind: 'seat', live: true, children: [] },
		]);
	});

	// Nothing in the data forbids a parent chain that closes on itself, and the
	// descent would otherwise recurse until the stack gave out, emptying the view.
	test('terminates on a cycle instead of recursing until the stack gives out', () => {
		expect(() =>
			assembleForest(
				[row('a', 'one', 'b'), row('b', 'two', 'a')],
				new Set(['a', 'b']),
				NO_SUBAGENTS,
				NO_PLACES
			)
		).not.toThrow();
	});

	// Alan is the ultimate root, so a seat answering to him is a root even though
	// something spawned it and that spawner is on screen — which is what lets him
	// move a session between interactive and headless without it moving in the tree.
	test('roots a seat Alan is the principal of even where its spawner is present', () => {
		const rows = [row('a', 'spawner', null), row('b', 'alans-seat', 'a', 'alan')];
		expect(shape(assembleForest(rows, new Set(['a', 'b']), NO_SUBAGENTS, NO_PLACES))).toEqual([
			{ name: 'alans-seat', kind: 'seat', live: true, children: [] },
			{ name: 'spawner', kind: 'seat', live: true, children: [] },
		]);
	});

	// Silence is answered with the agent form, as the seat name answers it. Reading
	// an unrecorded principal as Alan would make a root of most of the fleet — and
	// the row is silent for most seats today, which is the gap Alan accepted when he
	// ruled that roots come from the row alone.
	test('does not root a seat whose row records no principal', () => {
		const rows = [row('a', 'spawner', null), row('b', 'unrecorded', 'a')];
		expect(shape(assembleForest(rows, new Set(['a', 'b']), NO_SUBAGENTS, NO_PLACES))).toEqual([
			{
				name: 'spawner',
				kind: 'seat',
				live: true,
				children: [{ name: 'unrecorded', kind: 'seat', live: true, children: [] }],
			},
		]);
	});

	// An explicit `agent` principal is not a root either, and is distinct from
	// silence only in that somebody stated it.
	test('does not root a seat whose principal is an agent', () => {
		const rows = [row('a', 'spawner', null), row('b', 'worker', 'a', 'agent')];
		expect(shape(assembleForest(rows, new Set(['a', 'b']), NO_SUBAGENTS, NO_PLACES))).toEqual([
			{
				name: 'spawner',
				kind: 'seat',
				live: true,
				children: [{ name: 'worker', kind: 'seat', live: true, children: [] }],
			},
		]);
	});

	// `name` is nullable on the row, and a null label renders as an empty row that
	// cannot be told from a rendering fault.
	test('falls back to the id where a row carries no name', () => {
		expect(
			shape(assembleForest([row('abc', null, null)], new Set(['abc']), NO_SUBAGENTS, NO_PLACES))
		).toEqual([{ name: 'abc', kind: 'seat', live: true, children: [] }]);
	});

	// The place rides onto a seat node so its row can offer the place toggle. A
	// STOPPED seat carries one too — it is the destination its run toggle brings it
	// back to, which is why that toggle is offered on a stopped row rather than
	// greyed out. A subagent carries none: it is not a seat and takes no toggles.
	test('stamps each seat with its place, stopped seats included', () => {
		const rows = [row('a', 'sitting', null), row('b', 'detached', null)];
		const places = new Map<string, SeatMode>([
			['a', 'interactive'],
			['b', 'headless'],
		]);
		const subagents = new Map([['a', [subagent('t1', 'a subagent')]]]);
		const forest = assembleForest(rows, new Set(['a', 'b']), subagents, places);
		expect(forest.map((n) => ({ name: n.name, live: n.live, place: n.place }))).toEqual([
			{ name: 'detached', live: true, place: 'headless' },
			{ name: 'sitting', live: true, place: 'interactive' },
		]);
		expect(
			forest.flatMap((n) => n.children).find((c) => c.kind === 'subagent')?.place
		).toBeUndefined();
	});

	// The rows arrive newest-first, so their order moves as seats start and stop.
	// If that reached the view, a refresh would reshuffle rows under the pointer.
	test('orders sibling seats from their names, not from the order the rows arrived', () => {
		const forward = assembleForest(
			[row('a', 'root', null), row('b', 'zeta', 'a'), row('c', 'alpha', 'a')],
			new Set(['a', 'b', 'c']),
			NO_SUBAGENTS,
			NO_PLACES
		);
		const reversed = assembleForest(
			[row('c', 'alpha', 'a'), row('b', 'zeta', 'a'), row('a', 'root', null)],
			new Set(['a', 'b', 'c']),
			NO_SUBAGENTS,
			NO_PLACES
		);
		expect(shape(forward)).toEqual(shape(reversed));
	});

	test('hangs a seat\'s subagents under its own row, beside the seats it spawned', () => {
		const rows = [row('a', 'lead', null), row('b', 'worker', 'a')];
		const subagents = new Map([['a', [subagent('t1', 'Survey the corpus')]]]);
		expect(shape(assembleForest(rows, new Set(['a', 'b']), subagents, NO_PLACES))).toEqual([
			{
				name: 'lead',
				kind: 'seat',
				live: true,
				children: [
					{ name: 'worker', kind: 'seat', live: true, children: [] },
					{ name: 'Survey the corpus', kind: 'subagent', live: true, children: [] },
				],
			},
		]);
	});

	// A subagent can run a subagent, five deep at the most seen here, so one level
	// is not the shape.
	test('carries a subagent\'s own subagents beneath it', () => {
		const rows = [row('a', 'lead', null)];
		const subagents = new Map([['a', [subagent('t1', 'outer', [subagent('t2', 'inner')])]]]);
		expect(shape(assembleForest(rows, new Set(['a']), subagents, NO_PLACES))).toEqual([
			{
				name: 'lead',
				kind: 'seat',
				live: true,
				children: [
					{
						name: 'outer',
						kind: 'subagent',
						live: true,
						children: [{ name: 'inner', kind: 'subagent', live: true, children: [] }],
					},
				],
			},
		]);
	});

	// What is left is what is working. Most of the roster is dead, and a stopped
	// seat holding nothing is what the panel would otherwise fill up with.
	test('drops a stopped seat holding nothing that runs', () => {
		const rows = [row('a', 'stopped-and-empty', null), row('b', 'running', null)];
		expect(shape(assembleForest(rows, new Set(['b']), NO_SUBAGENTS, NO_PLACES))).toEqual([
			{ name: 'running', kind: 'seat', live: true, children: [] },
		]);
	});

	// The one thing that earns a stopped seat its row. Here it holds no live seat —
	// only a subagent — which is the case a rule keyed on seats alone would drop.
	test('keeps a stopped seat that holds only a running subagent', () => {
		const rows = [row('a', 'stopped-but-delegating', null)];
		const subagents = new Map([['a', [subagent('t1', 'still working')]]]);
		expect(shape(assembleForest(rows, new Set([]), subagents, NO_PLACES))).toEqual([
			{
				name: 'stopped-but-delegating',
				kind: 'seat',
				live: false,
				children: [{ name: 'still working', kind: 'subagent', live: true, children: [] }],
			},
		]);
	});

	// Pruning at the roots alone passes every test above, because every stopped row
	// the fetch produces has a live seat somewhere beneath it by construction.
	test('drops a stopped branch from inside the tree, not only from the roots', () => {
		const rows = [
			row('a', 'live-root', null),
			row('b', 'stopped-and-empty', 'a'),
			row('c', 'live-child', 'a'),
		];
		expect(shape(assembleForest(rows, new Set(['a', 'c']), NO_SUBAGENTS, NO_PLACES))).toEqual([
			{
				name: 'live-root',
				kind: 'seat',
				live: true,
				children: [{ name: 'live-child', kind: 'seat', live: true, children: [] }],
			},
		]);
	});
});
