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

const OPEN_TRANSCRIPT_COMMAND = 'opsTranscript.open';
import { ancestorNames } from "./lookup.ts";
import { type SeatClick } from './tree.ts';
import { parseSeatClick } from './invoked-seat.ts';

export async function showSeat(clicked: unknown): Promise<undefined> {
	const seat = parseSeatClick(clicked);
	if (seat === undefined) { return undefined; }

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

export async function columnForSeat(
	seat: SeatClick,
	seatNames: ReadonlySet<string>,
	psRows: readonly PsRow[],
	tmuxClients: readonly TmuxClient[]
): Promise<{ readonly column: ColumnNumber; readonly reason: string }> {
	let ancestorColumn: ColumnNumber | undefined;
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

export async function terminalForSeat(
	name: string,
	seatNames: ReadonlySet<string>,
	psRows: readonly PsRow[],
	tmuxClients: readonly TmuxClient[]
): Promise<vscode.Terminal | undefined> {
	if (psRows.length === 0) { return undefined; }
	const readings = await readProcessIds(vscode.window.terminals);
	for (const { terminal, pid } of identified(readings)) {
		if (seatNameForShellPid(pid, seatNames, psRows, tmuxClients) === name) { return terminal; }
	}
	return undefined;
}
