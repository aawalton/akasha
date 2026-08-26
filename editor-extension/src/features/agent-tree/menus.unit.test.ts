/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import { z } from 'zod';
import { manifest, matchesRow, rowItems, shownFor } from './menus-fixtures';

/**
 * The seat's menu is contributed in `package.json` and each entry is selected by a
 * `when` clause matching `viewItem` against a regex. NOTHING TYPECHECKS THOSE CLAUSES. A wrong
 * pattern does not fail to build and does not throw — the button simply never
 * appears, which is invisible until somebody hovers a row and finds it bare.
 *
 * So the shipped clauses are read out of the shipped manifest and matched against
 * the values `seatContextValue` actually produces. This is the check the workbench
 * would make, made without one.
 *
 * THE SAME ENTRIES ARE CONTRIBUTED A SECOND TIME, to `editor/title/context/replace`,
 * so a right-click on the tab of a seated terminal is served the seat's own menu
 * instead of the built-in tab menu. That block is checked the same way and for the
 * same reason, against `seatTabContext` — with one clause more to get wrong, since
 * these read a key this extension publishes rather than one the workbench does, and a
 * clause naming a key nothing sets matches nothing, claims no tab, and reports as the
 * built-in menu simply being what a tab has.
 */

const PLACE_INTERACTIVE = 'opsAgentTree.placeInteractive';
const PLACE_HEADLESS = 'opsAgentTree.placeHeadless';
const RUN_STOP = 'opsAgentTree.runStop';
const RUN_RESUME = 'opsAgentTree.runResume';
const RUN_RESET = 'opsAgentTree.runReset';
const COPY_SEAT_NAME = 'opsAgentTree.copySeatName';

/**
 * The four that are each offered on the one state a click on them means anything in.
 * Reset and Copy Seat Name stand beside them and are offered on every state.
 */
const TOGGLES: readonly string[] = [PLACE_INTERACTIVE, PLACE_HEADLESS, RUN_STOP, RUN_RESUME];

/**
 * A group string's name and the order the entry sorts at inside it: `2_run@2` is the
 * `2_run` group, second. VS Code reads the suffix, so it is what settles the order Alan
 * reads the entries in — and nothing typechecks either half.
 */
const GROUP_RE = /^(.+)@(\d+)$/;

/** The whole match and its two captures. */
const GROUP_SCHEMA = z.tuple([z.string(), z.string(), z.string()]);

/** Where the panel puts an entry, parsed rather than indexed into — see `matchesRow`. */
function rowGroup(command: string): { readonly name: string; readonly order: number } {
	const group = z.string().parse(rowItems.find((i) => i.command === command)?.group);
	const [, name, order] = GROUP_SCHEMA.parse(GROUP_RE.exec(group));
	return { name, order: Number(order) };
}

describe('the seat menu as contributed to a row', () => {
	// The whole point. Two toggles on every row, in every state — never one, never
	// three, and never none. COUNTED OVER THE TOGGLES rather than over the whole
	// menu, which is the change Copy Seat Name forced: it is a third entry on every
	// seat row and it is not a toggle, so counting entries here would have turned
	// the claim into "three things are offered" and stopped holding this one.
	test('offers exactly two toggles on a row, in all four states', () => {
		for (const live of [true, false]) {
			for (const place of ['interactive', 'headless'] as const) {
				expect(shownFor(live, place).filter((c) => TOGGLES.includes(c))).toHaveLength(2);
			}
		}
	});

	// The run toggle shows the act it will perform, so it must be the opposite of
	// what the row is. Showing `stop` on a stopped seat is the failure where a click
	// does nothing and the row looks broken.
	test('shows stop for a running seat and bring-back for a stopped one', () => {
		expect(shownFor(true, 'headless')).toContain(RUN_STOP);
		expect(shownFor(true, 'interactive')).toContain(RUN_STOP);
		expect(shownFor(false, 'headless')).toContain(RUN_RESUME);
		expect(shownFor(false, 'interactive')).toContain(RUN_RESUME);
	});

	// The place toggle likewise offers the place the seat is NOT in.
	test('offers the place the seat is not in', () => {
		expect(shownFor(true, 'headless')).toContain(PLACE_INTERACTIVE);
		expect(shownFor(false, 'headless')).toContain(PLACE_INTERACTIVE);
		expect(shownFor(true, 'interactive')).toContain(PLACE_HEADLESS);
		expect(shownFor(false, 'interactive')).toContain(PLACE_HEADLESS);
	});

	// A STOPPED SEAT STILL HAS A PLACE. Its place toggle is offered rather than
	// greyed out, which is what keeps the two toggles independent rather than one
	// destination picker in disguise — and it is the case a `when` clause keyed on
	// the run state alone would silently drop.
	test('offers a place toggle on a stopped row', () => {
		const stopped = shownFor(false, 'headless');
		expect(stopped).toContain(PLACE_INTERACTIVE);
		expect(stopped).not.toContain(PLACE_HEADLESS);
	});

	// A SUBAGENT ROW CARRIES NOTHING AT ALL. A subagent is not a seat: `ops seat
	// stop` does not address one, there is no session to resume it on, and it has no
	// seat name to copy — so any entry offered there would fail when clicked. Every
	// clause is anchored on the `seat.` prefix, and this is what holds that anchor in
	// place, now over the copy entry as well as the four toggles.
	//
	// AND NO EMPTY MENU OPENS ON ONE. That is the workbench's own doing rather than
	// this manifest's: `treeView.ts` resolves the row's actions and returns without
	// showing anything when the list is empty, so matching nothing here means Alan
	// gets no popup rather than a bare one.
	test('offers nothing at all on a subagent row', () => {
		expect(rowItems.filter((i) => matchesRow(i.when, 'subagent')).map((i) => i.command)).toEqual([]);
	});

	// A SEAT ROW OFFERS ITS NAME. Copy Seat Name is the one entry that fires
	// whatever state the row is in, because a name is a name whether the seat is
	// running or not.
	test('offers Copy Seat Name on a seat row, in all four states', () => {
		for (const live of [true, false]) {
			for (const place of ['interactive', 'headless'] as const) {
				expect(shownFor(live, place)).toContain(COPY_SEAT_NAME);
			}
		}
	});

	// RESET IS OFFERED ON EVERY SEAT ROW, running or stopped, which is what separates it
	// from Stop and Resume — each of those is offered on one state alone, because clicking
	// it in the other would do nothing. What a reset destroys is the agent's memory, and a
	// stopped seat still holds that, so the run state changes nothing about whether the
	// entry belongs on the row. A clause keyed on `seat.running.` would drop exactly the
	// case Alan reaches for a reset in.
	test('offers Reset on a seat row, in all four states', () => {
		for (const live of [true, false]) {
			for (const place of ['interactive', 'headless'] as const) {
				expect(shownFor(live, place)).toContain(RUN_RESET);
			}
		}
	});

	// RESET STANDS WITH THE RUN ENTRIES AND BELOW THEM. It acts on the process in the seat,
	// so it belongs in their group rather than beside the entry that only copies a name; and
	// it is the one act here that cannot be undone, so it sorts last within that group,
	// which is what keeps it off the spot a click aimed at Stop or Resume lands on.
	test('sorts Reset with the run entries and after them', () => {
		expect(rowGroup(RUN_RESET).name).toBe(rowGroup(RUN_STOP).name);
		expect(rowGroup(RUN_RESET).name).toBe(rowGroup(RUN_RESUME).name);
		expect(rowGroup(RUN_RESET).order).toBeGreaterThan(rowGroup(RUN_STOP).order);
		expect(rowGroup(RUN_RESET).order).toBeGreaterThan(rowGroup(RUN_RESUME).order);
	});

	// NOTHING IS A HOVER BUTTON ANY MORE, and `inline` is the whole of what decides
	// that: it is the one group VS Code renders as an action on the row itself, and
	// every other group name sends the entry to the right-click menu. This is the
	// assertion that was the old arrangement written down — all four in `inline`
	// groups — turned around to hold the new one.
	//
	// The grouping claim it carried is kept and extended: the two place toggles
	// share a group and the two run toggles share another, so neither jumps position
	// as a seat starts and stops; and Copy Seat Name sits in a third of its own,
	// away from the entries that change something, which is what the file explorer
	// does with Copy Path. The three sort place, then run, then copy.
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
		// VS Code orders separated groups by their name, so the order Alan reads them
		// in is this sort — place, then run, then copy.
		expect(groups).toEqual(groups.slice().sort());
	});

	// THE TITLE IS THE VISIBLE LABEL NOW, which is the whole of what changed about
	// it. These four titles used to be whole sentences and this test used to assert
	// the restart-or-kill warning was inside one — correct while they were hover
	// text, where the icon was seen and the sentence was revealed. On right-click
	// the sentence IS the menu, so the labels are short and the warning moved to a
	// confirmation dialog at the moment of the click, which is where
	// `confirmTurnLoss` holds it and `toggles.unit.test.ts` asserts it. That is the
	// claim this one gave up, and it did not go unheld.
	//
	// READ OFF THE SHIPPED MENU rather than off a list kept here, so an entry added to the
	// row is held to this without anything being edited to cover it.
	test('every entry reads as a menu label rather than as a sentence', () => {
		for (const { command } of rowItems) {
			const title = manifest.contributes.commands.find((c) => c.command === command)?.title ?? '';
			expect(title.length).toBeGreaterThan(0);
			expect(title.length).toBeLessThanOrEqual(20);
			// The punctuation a sentence needs and a label does not.
			expect(title).not.toMatch(/[—,.;:]/);
		}
	});
});
