import { describe, expect, test } from 'bun:test';
import { arrangementFrom, type LayoutGroup } from './editor-layout.ts';

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

	test('carries every tab, whatever it holds', () => {
		const arrangement = arrangementFrom(GROUPS, WINDOW);
		expect(arrangement.groups.map((group) => group.tabs.length)).toEqual(
			GROUPS.map((group) => group.tabs.length)
		);
	});

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
