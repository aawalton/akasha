/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import { arrangementFrom, type LayoutGroup } from './editor-layout';

// Two groups: a seat terminal and a file beside it in one, a second seat and an
// unmodelled tab in the other. The mixture is the point — a record describing
// only terminals is one somebody has to generalise later.
const GROUPS: readonly LayoutGroup[] = [
	{
		column: 1,
		active: true,
		tabs: [
			{ kind: 'terminal', label: 'amy-readouts', seat: 'amy-readouts', active: true },
			{ kind: 'text', label: 'terminal-lookup.ts', uri: 'file:///a.ts', active: false },
		],
	},
	{
		column: 2,
		active: false,
		tabs: [
			{ kind: 'terminal', label: 'nimue', seat: 'nimue', active: false },
			{ kind: 'other', label: 'Settings', active: true },
		],
	},
];

describe('arrangementFrom', () => {
	const WINDOW = '4242.99';

	test('calls a group\'s number its position, which is what the page type states', () => {
		const arrangement = arrangementFrom(GROUPS, WINDOW);
		expect(arrangement.window).toBe(WINDOW);
		expect(arrangement.groups.map((group) => group.position)).toEqual([1, 2]);
	});

	// Every tab crosses, terminal or not. A group's contents with the unmodelled tabs
	// silently missing would be wrong rather than partial, and the page a tab writes
	// is named for its place in the group rather than for what it shows.
	test('carries every tab, whatever it holds', () => {
		const arrangement = arrangementFrom(GROUPS, WINDOW);
		expect(arrangement.groups.map((group) => group.tabs.length)).toEqual(
			GROUPS.map((group) => group.tabs.length)
		);
	});

	// A terminal page is keyed on the process, so a tab that never answered one
	// contributes no terminal rather than a terminal keyed on nothing.
	test('names a terminal only where the tab said which process it runs', () => {
		const groups: readonly LayoutGroup[] = [
			{
				column: 1,
				active: true,
				tabs: [
					{ kind: 'terminal', label: 'amy', seat: 'amy', process: '17.5', active: true },
					{ kind: 'terminal', label: 'bash', active: false },
				],
			},
		];
		const [group] = arrangementFrom(groups, WINDOW).groups;
		expect(group?.tabs[0]).toEqual({ label: 'amy', active: true, terminal: '17.5', seat: 'amy' });
		expect(group?.tabs[1]).toEqual({ label: 'bash', active: false });
	});
});
