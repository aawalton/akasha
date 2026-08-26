/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import { z } from 'zod';
import type { SeatMode } from '../../seat/mode';
import { CLAUSE_SCHEMA, manifest, rowItems, shownFor, tabItems } from './menus-fixtures';
import { SEAT_TAB_KEY_NAMES, seatTabContext } from './seat-tabs';

/**
 * The whole of what a tab clause may say: the terminal scheme, and one membership test
 * against one key.
 *
 * ANCHORED AT BOTH ENDS, which is what makes the scheme half a claim rather than a
 * prefix this happens to find. A clause missing it would offer these entries over a file
 * tab, and — because any match REPLACES the built-in tab menu — that tab would lose
 * Close, Split and the rest, which is a worse failure than an entry that never shows.
 */
const TAB_CLAUSE_RE =
	/^resourceScheme == 'vscode-terminal' && resourceFilename in ([A-Za-z0-9_.]+)$/;

/** The ids a key holds, parsed rather than indexed into — see `matchesRow`. */
const PUBLISHED_SCHEMA = z.array(z.string());

/** The key a tab clause reads, or a failure naming the clause that carries none. */
function tabKey(when: string): string {
	const [, key] = CLAUSE_SCHEMA.parse(TAB_CLAUSE_RE.exec(when));
	return key;
}

/**
 * Whether a clause claims the tab whose `resourceFilename` is `id`, given what this
 * extension published.
 *
 * `source.includes(item)` is what `ContextKeyInExpr.evaluate` does over an array, on a
 * string against strings, so this is the evaluation the workbench would make. A key the
 * publisher does not answer for arrives here as `undefined` and fails the parse rather
 * than reading as a tab correctly left alone.
 */
function claimsTab(
	when: string,
	published: Readonly<Record<string, readonly string[]>>,
	id: string
): boolean {
	return PUBLISHED_SCHEMA.parse(published[tabKey(when)]).includes(id);
}

/** The instance id of the one seat tab these tests put in the window. */
const TAB_ID = 7;

/** Every tab command whose clause fires for a tab holding a seat in this state. */
function shownForTab(live: boolean, place: SeatMode): readonly string[] {
	const published = seatTabContext([{ instanceId: TAB_ID, live, place }]);
	return tabItems.filter((i) => claimsTab(i.when, published, String(TAB_ID))).map((i) => i.command);
}

describe('the seat menu as contributed to an editor tab', () => {
	// THE FIRST THING THAT CAN GO WRONG AND SAY NOTHING. These clauses read keys this
	// extension sets with `setContext`, so a misspelt one is a well-formed clause naming
	// something nothing publishes: it matches no tab, the tab is unclaimed, and Alan gets
	// the built-in menu — which is exactly what a tab holding no seat correctly gets. The
	// key names are imported rather than repeated, so renaming one here without renaming it
	// in the manifest fails.
	//
	// The scheme half is held by the same parse. A clause that dropped it would claim file
	// tabs, and a claimed tab is served THESE entries INSTEAD OF the built-in menu, so that
	// failure takes Close and Split off every tab in the window.
	test('every clause pins the terminal scheme and names a published key', () => {
		for (const item of tabItems) {
			expect(SEAT_TAB_KEY_NAMES).toContain(tabKey(item.when));
		}
	});

	// A menu entry naming a command that is not contributed shows as a disabled row or not
	// at all, depending on where it is drawn, and nothing builds any differently.
	test('every entry names a contributed command', () => {
		const contributed = manifest.contributes.commands.map((c) => c.command);
		for (const item of tabItems) {
			expect(contributed).toContain(item.command);
		}
	});

	// THE WHOLE POINT, stated as the equality it is: a tab holding a seat is offered what
	// that seat's row is offered, and nothing else. Both sides are computed from the shipped
	// clauses and the values the shipped code publishes, so the two blocks drifting apart —
	// an entry added to one, a state mapped differently — fails here rather than showing up
	// as two menus for one seat.
	test('offers a tab exactly what the panel offers that seat, in all four states', () => {
		for (const live of [true, false]) {
			for (const place of ['interactive', 'headless'] as const) {
				expect([...shownForTab(live, place)].sort()).toEqual([...shownFor(live, place)].sort());
			}
		}
	});

	// ORDER AND SEPARATORS ARE THE GROUP STRINGS, and Alan reads one menu having learnt the
	// other. Same command, same group, so the two place toggles sit together, the two run
	// toggles below them, and Copy Seat Name apart from both, in the order the panel sorts.
	//
	// The panel's group is PARSED rather than defaulted, so an entry offered on a tab and
	// not on a row fails here naming itself, instead of being compared against an empty
	// string it could never equal.
	test('groups every entry where the panel groups it', () => {
		for (const item of tabItems) {
			const onTheRow = z.string().parse(rowItems.find((i) => i.command === item.command)?.group);
			expect(item.group).toBe(onTheRow);
		}
	});

	// AN UNSEATED TAB MUST BE UNTOUCHED. A window holding no seat tabs publishes five empty
	// arrays, and `includes` over an empty array is false — so there is no state of the keys
	// in which a clause matches by default. This is what keeps an ordinary file tab, and a
	// terminal tab running a bare shell, on the built-in menu.
	test('claims nothing while no seat holds a tab', () => {
		const published = seatTabContext([]);
		expect(tabItems.filter((i) => claimsTab(i.when, published, String(TAB_ID)))).toEqual([]);
	});

	// AND NOTHING CLAIMS A TAB IT WAS NOT PUBLISHED FOR. Membership is by id, so a second
	// tab open beside a seat's is claimed only if its own id was published — the case that
	// separates "some seat is on screen" from "this tab is that seat".
	test('claims only the tab whose id was published', () => {
		const published = seatTabContext([{ instanceId: TAB_ID, live: true, place: 'headless' }]);
		expect(tabItems.filter((i) => claimsTab(i.when, published, '99'))).toEqual([]);
	});
});
