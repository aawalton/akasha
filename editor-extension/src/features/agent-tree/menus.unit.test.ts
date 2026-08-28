import { describe, expect, test } from 'bun:test';
import { z } from 'zod';
import { manifest, matchesRow, rowItems, shownFor } from './menus-fixtures.ts';

const PLACE_INTERACTIVE = 'opsAgentTree.placeInteractive';
const PLACE_HEADLESS = 'opsAgentTree.placeHeadless';
const RUN_STOP = 'opsAgentTree.runStop';
const RUN_RESUME = 'opsAgentTree.runResume';
const RUN_RESET = 'opsAgentTree.runReset';
const COPY_SEAT_NAME = 'opsAgentTree.copySeatName';

const TOGGLES: readonly string[] = [PLACE_INTERACTIVE, PLACE_HEADLESS, RUN_STOP, RUN_RESUME];

const GROUP_RE = /^(.+)@(\d+)$/;

const GROUP_SCHEMA = z.tuple([z.string(), z.string(), z.string()]);

function rowGroup(command: string): { readonly name: string; readonly order: number } {
	const group = z.string().parse(rowItems.find((i) => i.command === command)?.group);
	const [, name, order] = GROUP_SCHEMA.parse(GROUP_RE.exec(group));
	return { name, order: Number(order) };
}

describe('the seat menu as contributed to a row', () => {
	test('offers exactly two toggles on a row, in all four states', () => {
		for (const live of [true, false]) {
			for (const place of ['interactive', 'headless'] as const) {
				expect(shownFor(live, place).filter((c) => TOGGLES.includes(c))).toHaveLength(2);
			}
		}
	});

	test('shows stop for a running seat and bring-back for a stopped one', () => {
		expect(shownFor(true, 'headless')).toContain(RUN_STOP);
		expect(shownFor(true, 'interactive')).toContain(RUN_STOP);
		expect(shownFor(false, 'headless')).toContain(RUN_RESUME);
		expect(shownFor(false, 'interactive')).toContain(RUN_RESUME);
	});

	test('offers the place the seat is not in', () => {
		expect(shownFor(true, 'headless')).toContain(PLACE_INTERACTIVE);
		expect(shownFor(false, 'headless')).toContain(PLACE_INTERACTIVE);
		expect(shownFor(true, 'interactive')).toContain(PLACE_HEADLESS);
		expect(shownFor(false, 'interactive')).toContain(PLACE_HEADLESS);
	});

	test('offers a place toggle on a stopped row', () => {
		const stopped = shownFor(false, 'headless');
		expect(stopped).toContain(PLACE_INTERACTIVE);
		expect(stopped).not.toContain(PLACE_HEADLESS);
	});

	test('offers nothing at all on a subagent row', () => {
		expect(rowItems.filter((i) => matchesRow(i.when, 'subagent')).map((i) => i.command)).toEqual([]);
	});

	test('offers Copy Seat Name on a seat row, in all four states', () => {
		for (const live of [true, false]) {
			for (const place of ['interactive', 'headless'] as const) {
				expect(shownFor(live, place)).toContain(COPY_SEAT_NAME);
			}
		}
	});

	test('offers Reset on a seat row, in all four states', () => {
		for (const live of [true, false]) {
			for (const place of ['interactive', 'headless'] as const) {
				expect(shownFor(live, place)).toContain(RUN_RESET);
			}
		}
	});

	test('sorts Reset with the run entries and after them', () => {
		expect(rowGroup(RUN_RESET).name).toBe(rowGroup(RUN_STOP).name);
		expect(rowGroup(RUN_RESET).name).toBe(rowGroup(RUN_RESUME).name);
		expect(rowGroup(RUN_RESET).order).toBeGreaterThan(rowGroup(RUN_STOP).order);
		expect(rowGroup(RUN_RESET).order).toBeGreaterThan(rowGroup(RUN_RESUME).order);
	});

	test('contributes a right-click menu of three separated groups, none inline', () => {
		const groupOf = (command: string): string =>
			rowItems.find((i) => i.command === command)?.group ?? '';
		for (const item of rowItems) {
			expect(item.group.startsWith('inline')).toBe(false);
		}
		expect(groupOf(PLACE_INTERACTIVE)).toBe(groupOf(PLACE_HEADLESS));
		expect(groupOf(RUN_STOP)).toBe(groupOf(RUN_RESUME));
		const groups = [groupOf(PLACE_INTERACTIVE), groupOf(RUN_STOP), groupOf(COPY_SEAT_NAME)];
		expect(new Set(groups).size).toBe(3);
		expect(groups).toEqual(groups.slice().sort());
	});

	test('every entry reads as a menu label rather than as a sentence', () => {
		for (const { command } of rowItems) {
			const title = manifest.contributes.commands.find((c) => c.command === command)?.title ?? '';
			expect(title.length).toBeGreaterThan(0);
			expect(title.length).toBeLessThanOrEqual(20);
			expect(title).not.toMatch(/[—,.;:]/);
		}
	});
});
