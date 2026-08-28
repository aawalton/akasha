/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { type SeatStep, type SeatToggleState } from "./toggles.ts"
import { confirmTurnLoss, type SeatAct } from "./confirm.ts";
import { invokedSeat } from './invoked-seat.ts';
import { performPlan } from './seat-acts.ts';
import { output } from './tree-state.ts';

// A toggle changes what the next poll will read, so the tree is re-read as soon
// as the plan finishes rather than left showing the old state for a whole
// interval.
export async function runPlan(
node: unknown,
plan: (state: SeatToggleState) => readonly SeatStep[],
act: SeatAct,
refresh: (trigger: string) => Promise<undefined>
): Promise<undefined> {
	const seat = invokedSeat(node);
	if (seat === undefined) { return undefined; }
	// `live` is membership of the live listing, which is the run axis the toggles
	// read; the place is the other.
	const state: SeatToggleState = { running: seat.live, place: seat.place };
	const steps = plan(state);
	// WHERE THE WARNING LIVES NOW. It was in the command title while these were
	// hover buttons; on right-click the title is the visible label, so it moved
	// here. `confirmTurnLoss` answers only where the plan reaches for a running
	// process, so a stopped seat is never asked about one. Shaped after the
	// explorer's own irreversible delete, which is the reference Alan gave: a
	// question, a detail naming what cannot be recovered, and a button spelling
	// the act — with no "do not ask me again", because a lost turn does not come
	// back and the explorer drops that checkbox for the same reason.
	const prompt = confirmTurnLoss(act, seat.name, state, steps);
	if (prompt !== undefined) {
		const picked = await vscode.window.showWarningMessage(
			prompt.message,
			{ modal: true, detail: prompt.detail },
			prompt.confirm
		);
		// Dismissing the dialog answers `undefined`, so ANYTHING but the primary
		// button abandons the plan. Nothing is attempted and the seat is untouched.
		if (picked !== prompt.confirm) {
			output.appendLine(`[${act}] ${seat.name}: declined at the warning, nothing done`);
			return undefined;
		}
	}
	await performPlan(seat, steps, act);
	await refresh(act);
	return undefined;
};

