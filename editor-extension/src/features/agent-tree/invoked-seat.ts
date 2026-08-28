/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { z } from 'zod';
import { SEAT_MODE_SCHEMA } from '../../seat/mode.ts';
import { type AgentNode } from './forest.ts';
import { type SeatClick } from './tree.ts';
import { forest, seatTabs } from './tree-state.ts';

/**
 * The clicked row's id and name, or nothing where the argument is not one.
 *
 * Parsed rather than cast: the argument arrives through the command system,
 * which anything in the editor can invoke with anything, and a malformed one
 * opening a transcript for the empty seat would be worse than a click that does
 * nothing. Loose, because the row may grow fields this does not read.
 */
const SEAT_CLICK_SCHEMA = z.looseObject({ id: z.string().min(1), name: z.string().min(1) });

export function parseSeatClick(clicked: unknown): SeatClick | undefined {
	const parsed = SEAT_CLICK_SCHEMA.safeParse(clicked);
	return parsed.success ? { id: parsed.data.id, name: parsed.data.name } : undefined;
}

/**
 * Exactly what a toggle reads off a row, and no more. `kind` is demanded and must
 * be `seat`: a subagent is not a seat, `ops seat stop` does not address one, and
 * no `when` clause offers a toggle over one — so a row arriving here as anything
 * else came from the palette or a defect, and is declined rather than acted on.
 */
const TOGGLE_TARGET_SCHEMA = z.object({
	id: z.string().min(1),
	name: z.string(),
	kind: z.literal('seat'),
	live: z.boolean(),
	place: SEAT_MODE_SCHEMA,
});
export type ToggleTarget = z.infer<typeof TOGGLE_TARGET_SCHEMA>;

/**
 * The row VS Code handed the command, where it is a seat on this tree.
 *
 * PARSED RATHER THAN ASSUMED. The argument crosses a boundary — it comes from the
 * workbench rather than from this code, and every command in `package.json` can
 * also be run from the palette, where it arrives with no argument at all. A cast
 * would make that case a crash inside a toggle rather than a row this declines to
 * act on.
 */
export function asToggleTarget(value: unknown): ToggleTarget | undefined {
	const parsed = TOGGLE_TARGET_SCHEMA.safeParse(value);
	return parsed.success ? parsed.data : undefined;
}

/** The scheme a terminal editor's resource carries, and the only one a seat tab has. */
const TERMINAL_SCHEME = 'vscode-terminal';

/**
 * The seat behind a right-clicked editor tab, where the argument is one holding a seat.
 *
 * A TAB MENU HANDS THE COMMAND ITS EDITOR'S URI, not a tree row —
 * `vscode-terminal:/{workspaceId}/{instanceId}`, the same resource whose basename the
 * `when` clause matched as `resourceFilename`. The id is read back out of the path here
 * rather than taken on the clause's word, because a command in `package.json` can be
 * invoked by anything with anything.
 *
 * THE ANSWER IS THE FOREST'S OWN NODE, which is the shape a tree row arrives as. That is
 * the whole of the widening: the tab path produces what the row path already produced and
 * hands it to the same gate, so a seat that is not on the tree, a terminal tab running no
 * seat, and a file tab all fall out here as nothing.
 */
function seatForTab(value: unknown): AgentNode | undefined {
	if (!(value instanceof vscode.Uri) || value.scheme !== TERMINAL_SCHEME) { return undefined; }
	const last = value.path.split('/').at(-1);
	if (last === undefined) { return undefined; }
	const instanceId = Number(last);
	// `Number('')` is 0 and `Number('3x')` is NaN, and an instance id is neither. A path
	// this cannot read is a resource that is not a terminal editor's, whatever its scheme.
	if (!Number.isInteger(instanceId)) { return undefined; }
	return seatTabs.get(instanceId);
}

/**
 * The seat a menu entry was invoked over, from a tree row or from an editor tab.
 *
 * ONE GATE FOR BOTH. `asToggleTarget` is what decides, and it is handed the same shape
 * either way — so the palette, which invokes with no argument at all, is declined here
 * exactly as it was, and nothing about a tab widens what a seat has to look like.
 */
export function invokedSeat(value: unknown): ToggleTarget | undefined {
	return asToggleTarget(seatForTab(value) ?? value);
}
