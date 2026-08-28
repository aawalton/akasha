/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Which editor tabs hold a seat, and in what state, spelled as the context keys the
 * tab menu's `when` clauses read.
 *
 * THE CLAUSE IS THE WHOLE CLAIM. `editorTabsControl.ts` asks
 * `MenuId.EditorTitleContextReplace` what it offers for the tab under the cursor, and
 * serves that INSTEAD OF the built-in tab menu wherever anything answers. So these keys
 * are the only thing that claims a tab: an ordinary file tab, and a terminal tab running
 * no seat, match nothing here and keep the menu every other tab has.
 *
 * THE JOIN KEY IS THE TERMINAL INSTANCE ID. A terminal editor's resource is
 * `vscode-terminal:/{workspaceId}/{instanceId}`, and `ResourceContextKey` sets
 * `resourceFilename` to its basename — the instance id, as a string. `TabInputTerminal`
 * carries the same id, so the tab model is what turns a seat's terminal into the value a
 * clause is evaluated against.
 *
 * THE VALUES ARE ARRAYS OF STRINGS, because the clauses use `in` and
 * `ContextKeyInExpr.evaluate` answers `source.includes(item)` over an array — a strict
 * comparison against `resourceFilename`, which is a string. Numbers would match nothing
 * and would report as every tab being unclaimed, which is what an extension with nothing
 * to contribute also looks like.
 *
 * AN EMPTY ARRAY CLAIMS NOTHING, which is the answer wanted while no seat is on screen: a
 * key that is absent and a key holding no ids both leave `includes` false, so there is no
 * state of this module in which a tab is claimed by default.
 *
 * NO `vscode` IMPORT HERE ON PURPOSE. The suite reads the shipped clauses out of
 * `package.json` and checks each names a key this file publishes, which it can only do by
 * importing this file outside an extension host.
 */
import type { SeatMode } from '../../seat/mode.ts';

/**
 * The five keys, one per entry the seat's row offers, so each clause reads one key and
 * combines nothing.
 */
export const SEAT_TAB_KEYS = {
	/** Every seat with a tab, in whatever state — what Copy Seat Name is offered on. */
	any: 'opsAgentTree.seatTabs',
	/** Seats in the live listing, which is the axis the run toggle reads. */
	running: 'opsAgentTree.seatTabsRunning',
	stopped: 'opsAgentTree.seatTabsStopped',
	/** Where the seat runs, which a stopped seat still has — the axis the place toggle reads. */
	interactive: 'opsAgentTree.seatTabsInteractive',
	headless: 'opsAgentTree.seatTabsHeadless',
} as const;

/** Every key name, for a caller checking that a clause names one of them. */
export const SEAT_TAB_KEY_NAMES: readonly string[] = Object.values(SEAT_TAB_KEYS);

/**
 * What one claimed tab contributes, and no more.
 *
 * Narrower than `AgentNode`, which satisfies it structurally: this reads two fields of a
 * seat and asking for the other seven would make it look as though it weighed them.
 */
export interface SeatTabState {
	readonly instanceId: number;
	/** Membership of the live listing. */
	readonly live: boolean;
	/**
	 * Where the seat runs, which a stopped seat still has.
	 *
	 * Optional because `AgentNode.place` is — a subagent has none — and every SEAT the
	 * forest builds carries one, so the fallback below stands for the type rather than for
	 * a case anything reaches.
	 */
	readonly place: SeatMode | undefined;
}

/**
 * What each key holds, given the seats holding a tab right now.
 *
 * EVERY KEY IS ANSWERED, including the ones nothing lands in. Publishing an empty array
 * over a key that held ids is how a tab stops being claimed; leaving the key out would
 * leave the last value standing.
 *
 * The four states mirror the row's five clauses exactly: a seat lands in `any`, in one of
 * `running`/`stopped`, and in one of `interactive`/`headless` — so a tab is offered the
 * same two toggles and the same copy entry the panel offers that seat.
 */
export function seatTabContext(
	tabs: readonly SeatTabState[]
): Readonly<Record<string, readonly string[]>> {
	const values: Record<string, string[]> = {};
	for (const key of SEAT_TAB_KEY_NAMES) { values[key] = []; }
	for (const { instanceId, live, place } of tabs) {
		const id = String(instanceId);
		values[SEAT_TAB_KEYS.any].push(id);
		values[live ? SEAT_TAB_KEYS.running : SEAT_TAB_KEYS.stopped].push(id);
		// FALLS BACK THE WAY THE ROW FALLS BACK. `tree.ts` reads `place ?? 'headless'` into
		// the row's context value, so a seat landing in a bucket at all is what keeps the tab
		// and the row offering the same place toggle rather than the tab offering none.
		values[SEAT_TAB_KEYS[place ?? 'headless']].push(id);
	}
	return values;
}
