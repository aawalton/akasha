/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { type ColumnNumber, chooseColumn } from '../../seat/editor-group.ts';
import {
	type PsRow,
	seatNameForShellPid,
	type TmuxClient,
} from '../../seat/terminal-lookup.ts';
import { identified, readProcessIds } from '../../seat/terminal-pids.ts';
import { groupForTerminal, openColumns, readSeatLookup } from './columns.ts';
import { columns, forest, output } from './tree-state.ts';

/** The command that opens a seat's transcript, sent rather than called. */
const OPEN_TRANSCRIPT_COMMAND = 'opsTranscript.open';
import { ancestorNames } from "./lookup.ts";
import { type SeatClick } from './tree.ts';
import { parseSeatClick } from './invoked-seat.ts';

/**
 * Shows what the clicked seat is doing.
 *
 * TWO HALVES OF ONE MEANING. A click asks to see the seat's work, and where that
 * work is showing decides what happens: a terminal in this window comes forward,
 * and otherwise the rendered transcript opens. Before this, the second half did
 * nothing at all, which is the report this was built from — Alan clicked a
 * headless seat and got silence.
 *
 * ONLY A SEAT ARRIVES HERE. A subagent row carries no command, so a subagent —
 * which has no agent row and no session sentinel — never reaches the transcript
 * half and cannot open an empty panel.
 *
 * THE SEAT IS READ AND LEFT ALONE. Nothing here signals a supervisor, writes a
 * session file or touches the agent row; the transcript panel downstream only
 * reads too. A click on a running headless seat leaves it running, and neither
 * toggle beside it is reached.
 *
 * `Terminal.show()` is the only focus-moving call in this feature and it runs
 * only here, under Alan's own click. The rename feature next door was rebuilt to
 * avoid exactly this call on a timer, and nothing on the refresh path may reach
 * it.
 */
export async function showSeat(clicked: unknown): Promise<undefined> {
	const seat = parseSeatClick(clicked);
	if (seat === undefined) { return undefined; }

	// Resolved at the moment of the click rather than from the poll's sample:
	// terminals open and close between polls, and a stale handle would show the
	// wrong one.
	const { seatNames, psRows, tmuxClients } = await readSeatLookup();
	const own = await terminalForSeat(seat.name, seatNames, psRows, tmuxClients);
	if (own !== undefined) {
		own.show();
		output.appendLine(`[click] ${seat.name}: terminal here, brought forward`);
		return undefined;
	}

	const column = await columnForSeat(seat, seatNames, psRows, tmuxClients);
	output.appendLine(
		`[click] ${seat.name}: no terminal here, transcript in column ${column.column} (${column.reason})`
	);
	await vscode.commands.executeCommand(OPEN_TRANSCRIPT_COMMAND, {
		agentId: seat.id,
		title: seat.name,
		viewColumn: column.column,
	});
	return undefined;
}

/**
 * The editor group a seat with no terminal here opens in.
 *
 * The three inputs are gathered here and weighed in `chooseColumn`, which holds
 * the rule and no reading.
 */
export async function columnForSeat(
	seat: SeatClick,
	seatNames: ReadonlySet<string>,
	psRows: readonly PsRow[],
	tmuxClients: readonly TmuxClient[]
): Promise<{ readonly column: ColumnNumber; readonly reason: string }> {
	let ancestorColumn: ColumnNumber | undefined;
	// Nearest ancestor first, so a headless seat under another headless seat
	// reaches the interactive one above them both rather than stopping short.
	for (const ancestor of ancestorNames(forest, seat.id)) {
		const terminal = await terminalForSeat(ancestor, seatNames, psRows, tmuxClients);
		if (terminal === undefined) { continue; }
		const found = groupForTerminal(terminal);
		if (found === undefined) { continue; }
		ancestorColumn = found;
		break;
	}
	return chooseColumn({
		remembered: columns.recall(seat.name),
		ancestorColumn,
		openColumns: openColumns(),
	});
}

/** The terminal in this window running a named seat, resolved through the process tree. */
export async function terminalForSeat(
	name: string,
	seatNames: ReadonlySet<string>,
	psRows: readonly PsRow[],
	tmuxClients: readonly TmuxClient[]
): Promise<vscode.Terminal | undefined> {
	if (psRows.length === 0) { return undefined; }
	// Bounded once for the sweep, for the same reason the column sample is. This
	// one is reached from Alan's click rather than from activation, so an
	// unbounded wait here stalls the click instead of the panel — the transcript
	// never opens and the terminal never comes forward.
	const readings = await readProcessIds(vscode.window.terminals);
	// A terminal that could not say what it is running is passed over rather than
	// matched on. Bringing the wrong terminal forward, or opening a transcript
	// beside it, is worse than falling through to the default.
	for (const { terminal, pid } of identified(readings)) {
		if (seatNameForShellPid(pid, seatNames, psRows, tmuxClients) === name) { return terminal; }
	}
	return undefined;
}
