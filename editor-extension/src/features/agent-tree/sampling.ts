/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { recordObservation, recordSweep } from '../../seat/observation-store.ts';
import { PROCESS_ID_TIMEOUT_MS } from '../../seat/terminal-pids.ts';
import { readSeatLookup, readSeatTerminals, type SeatTerminal } from './columns.ts';
import type { AgentNode } from './forest.ts';
import { columns, output } from './tree-state.ts';


/** Every row on screen, stopped seats included — the log's figure, not the header's. */
export function countRows(nodes: readonly AgentNode[]): number {
	let total = 0;
	for (const node of nodes) { total += 1 + countRows(node.children); }
	return total;
}

/**
 * Records where every seat's terminal is sitting right now.
 *
 * A seat that has stopped has no terminal to read a group off, so the reading has
 * to be taken while it is alive. Nothing else in the fleet writes this down.
 *
 * Failure is silent and total: no process table means no seat resolves, which
 * leaves the store holding what it held. A sample that could not be taken must
 * not be able to erase one that was.
 *
 * `undefined` IS THAT FAILURE, told apart from an empty reading. A window with no seat
 * terminals in it answers an empty list, which the caller is right to hold; a sweep that
 * could not be taken answers nothing, which the caller leaves its last reading standing
 * over.
 */
export async function sampleColumns(
	trigger: string,
	feature: string
): Promise<readonly SeatTerminal[] | undefined> {
	const { seatNames, psRows, tmuxClients } = await readSeatLookup();
	if (psRows.length === 0) { return undefined; }
	const { seats, sweep, counted, ms } = await readSeatTerminals(seatNames, psRows, tmuxClients);
	columns.record(seats);
	const placed = seats.filter((s) => s.column !== undefined).length;
	// THE SAME TWO LINES BELOW, WHERE SOMEBODY OTHER THAN ALAN CAN REACH THEM. The
	// channel still says all of it; this says it to a verifier holding a shell.
	recordSweep(feature, { ...counted, boundMs: PROCESS_ID_TIMEOUT_MS, ms, trigger });
	recordObservation(feature, { counts: { seatTerminals: seats.length, placed } });
	// THE SWEEP IS SAID FIRST because it is what decides how long this took, and
	// because the line under it cannot say it: a terminal that never answered and
	// one that answered and is not a seat are both simply absent from the count.
	output.appendLine(`[${trigger}] ${sweep}`);
	output.appendLine(
		`[${trigger}] ${seats.length} seat terminal(s) here, ${placed} in an editor group`
	);
	return seats;
}
