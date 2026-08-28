import { describe, expect, test } from 'bun:test';
import { z } from 'zod';
import type { SeatMode } from '../../seat/mode.ts';
import { CLAUSE_SCHEMA, manifest, rowItems, shownFor, tabItems } from './menus-fixtures.ts';
import { SEAT_TAB_KEY_NAMES, seatTabContext } from './seat-tabs.ts';

const TAB_CLAUSE_RE =
	/^resourceScheme == 'vscode-terminal' && resourceFilename in ([A-Za-z0-9_.]+)$/;

const PUBLISHED_SCHEMA = z.array(z.string());

function tabKey(when: string): string {
	const [, key] = CLAUSE_SCHEMA.parse(TAB_CLAUSE_RE.exec(when));
	return key;
}

function claimsTab(
	when: string,
	published: Readonly<Record<string, readonly string[]>>,
	id: string
): boolean {
	return PUBLISHED_SCHEMA.parse(published[tabKey(when)]).includes(id);
}

const TAB_ID = 7;

function shownForTab(live: boolean, place: SeatMode): readonly string[] {
	const published = seatTabContext([{ instanceId: TAB_ID, live, place }]);
	return tabItems.filter((i) => claimsTab(i.when, published, String(TAB_ID))).map((i) => i.command);
}

describe('the seat menu as contributed to an editor tab', () => {
	test('every clause pins the terminal scheme and names a published key', () => {
		for (const item of tabItems) {
			expect(SEAT_TAB_KEY_NAMES).toContain(tabKey(item.when));
		}
	});

	test('every entry names a contributed command', () => {
		const contributed = manifest.contributes.commands.map((c) => c.command);
		for (const item of tabItems) {
			expect(contributed).toContain(item.command);
		}
	});

	test('offers a tab exactly what the panel offers that seat, in all four states', () => {
		for (const live of [true, false]) {
			for (const place of ['interactive', 'headless'] as const) {
				expect([...shownForTab(live, place)].sort()).toEqual([...shownFor(live, place)].sort());
			}
		}
	});

	test('groups every entry where the panel groups it', () => {
		for (const item of tabItems) {
			const onTheRow = z.string().parse(rowItems.find((i) => i.command === item.command)?.group);
			expect(item.group).toBe(onTheRow);
		}
	});

	test('claims nothing while no seat holds a tab', () => {
		const published = seatTabContext([]);
		expect(tabItems.filter((i) => claimsTab(i.when, published, String(TAB_ID)))).toEqual([]);
	});

	test('claims only the tab whose id was published', () => {
		const published = seatTabContext([{ instanceId: TAB_ID, live: true, place: 'headless' }]);
		expect(tabItems.filter((i) => claimsTab(i.when, published, '99'))).toEqual([]);
	});
});
