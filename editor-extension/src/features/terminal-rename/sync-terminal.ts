/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { describeTerminal, type PidReading, PROCESS_ID_TIMEOUT_MS } from '../../seat/terminal-pids.ts';
import type { PsRow } from '../../seat/terminal-lookup.ts';
import { lastAppliedByTerminal, lastColorByTerminal, SILENT_TERMINAL_NAME } from './terminal-marks.ts';


/**
 * Draws one terminal in the colour of its seat's turn state, or takes that colour back off.
 *
 * THE SAME THREE COLOURS THE PANELS DRAW, and from the same reading: green while a seat is
 * working, blue while it waits on something arranged, yellow once it has stopped. A tab strip is
 * the surface Alan has open when he is looking at no panel at all, so it is where the state of the
 * fleet has to be legible without a click.
 *
 * SEPARATE FROM THE NAMING, because the two answer to different things. A seat that ends a turn
 * changes colour without changing name; a terminal that stopped reporting a
 * process is renamed to the silent marker and keeps the colour it had, since the marker is a
 * fact about the pid read rather than about which seat is in the tab. Sharing one record would
 * make each of those a case somebody has to remember to split out again.
 *
 * A COLOUR THIS FEATURE NEVER SET IS NEVER CLEARED, which is the rename path's rule applied to
 * the same surface. Alan can colour a terminal himself through the built-in picker, and a sweep
 * that reset every uncoloured seat's terminal would take his choice off on his next glance at
 * another window.
 *
 * COLOURS THAT COULD NOT BE READ AT ALL ARE LEFT ALONE, which `undefined` for the whole map says
 * and an empty map does not. The two look identical to a caller that only asks what a seat's
 * colour is, and the wrong reading of them clears the entire strip whenever an ask fails.
 */
export function syncColor(
	term: vscode.Terminal,
	name: string | undefined,
	seatAgentIds: ReadonlyMap<string, string>,
	colors: ReadonlyMap<string, string> | undefined,
	shellPid: number,
	trigger: string,
	output: vscode.OutputChannel
): void {
	if (colors === undefined) { return; }
	const agentId = name === undefined ? undefined : seatAgentIds.get(name);
	const color = agentId === undefined ? undefined : colors.get(agentId);
	if (color === undefined) {
		if (!lastColorByTerminal.has(term)) { return; }
		lastColorByTerminal.delete(term);
		term.recolor(undefined);
		output.appendLine(`[${trigger}] terminal shell=${shellPid} → colour cleared`);
		return;
	}
	if (lastColorByTerminal.get(term) === color) { return; }
	term.recolor(color);
	lastColorByTerminal.set(term, color);
	output.appendLine(`[${trigger}] terminal shell=${shellPid} → colour ${color}`);
}

/**
 * Names one terminal from what its shell process resolves to, and colours it.
 *
 * A TERMINAL THAT COULD NOT SAY WHAT IT IS RUNNING IS NEVER GIVEN A SEAT'S NAME.
 * Renaming from a pid this could not read would put a seat's name on a tab that
 * is not running it, and the tab label is what Alan steers by. That has not
 * changed and is not what the marker below does.
 *
 * WHAT CHANGED IS THAT IT NO LONGER PASSES IN SILENCE. It was left exactly as it
 * was, which meant the one terminal costing the window its whole bound sat in the
 * tab strip as `bash`, indistinguishable from the ten other tabs reading `bash`.
 * Identifying it from outside does not reduce: the layout record shows eighteen
 * terminals across nine groups with eleven of them labelled `bash`, elimination
 * against the process tree fails because a terminal that resolves to no seat is
 * passed over without a word, and the index the log prints is an array position
 * corresponding to nothing anybody can see. Alan asked which terminal it was and
 * the honest answer was that nobody could tell him. This makes the editor say it.
 */
export async function syncTerminal(
	reading: PidReading<vscode.Terminal>,
	name: string | undefined,
	index: number,
	of: number,
	seatAgentIds: ReadonlyMap<string, string>,
	psRows: readonly PsRow[],
	colors: ReadonlyMap<string, string> | undefined,
	trigger: string,
	output: vscode.OutputChannel
): Promise<void> {
	const term = reading.terminal;
	if (reading.outcome === 'no process') { return; }
	if (reading.outcome === 'never answered') {
		// NAMED BY EVERYTHING THAT DOES NOT NEED ITS PROCESS. This line used to carry
		// `term.name` alone, which is `"bash"` for every terminal that was never
		// renamed — so it reported that ONE terminal in the window was costing every
		// sweep the whole bound while saying nothing about which, and two days went
		// into asking. What follows is the read taken at the moment the wait gave up.
		output.appendLine(
			`[${trigger}] terminal did not report a process within ` +
			`${PROCESS_ID_TIMEOUT_MS}ms — tab marked: ` +
			describeTerminal(term, index, of)
		);
		// APPLIED ONCE, THROUGH THE SAME BOOKKEEPING EVERY OTHER NAME GOES THROUGH.
		// The sweep runs on every focus, so an unguarded rename here is one RPC per
		// keystroke-worth of attention. Recording it in `lastAppliedByTerminal` is
		// also what makes the mark come OFF by itself: if this terminal ever answers,
		// the branches below either replace it with the seat's name or, where it
		// resolves to no seat, hit the reset path that restores it to its shell's
		// command. Nothing else has to remember to clean it up.
		//
		// A NAME ALAN CHOSE HIMSELF IS OVERWRITTEN HERE, which the reset path is
		// careful never to do. It is the deliberate trade and he approved it: the
		// alternative is a tab that cannot be told from ten others, and this is the
		// one terminal in the window where being findable beats being left alone.
		if (lastAppliedByTerminal.get(term) !== SILENT_TERMINAL_NAME) {
			term.rename(SILENT_TERMINAL_NAME);
			lastAppliedByTerminal.set(term, SILENT_TERMINAL_NAME);
		}
		// THE COLOUR IS LEFT WHERE IT IS. This terminal's pid could not be read, so nothing
		// here knows whether its seat ended or its pty went quiet — and clearing the colour
		// would say the first while only the second was measured.
		return;
	}
	const shellPid = reading.pid;
	// BEFORE THE NAMING, and unconditionally, so that every route out of this function below
	// has already settled the colour. One of those routes returns without renaming anything,
	// and a colour settled after the naming would have been skipped along with it.
	syncColor(term, name, seatAgentIds, colors, shellPid, trigger, output);
	if (name === undefined) {
		// Only a terminal THIS feature named is reset. One Alan named himself, or one
		// that never resolved, is not ours to relabel.
		if (!lastAppliedByTerminal.has(term)) { return; }
		// WHICH OF THE TWO RESETS THIS IS, because they are not the same event and this
		// log is the only place either is visible. A seat that ended is routine. A
		// terminal that was marked silent and is now answering is the one thing nobody
		// has ever caught happening — the reading so far is that it never recovers, and
		// a line saying "seat gone" would bury the case that disproves it.
		const wasMarkedSilent = lastAppliedByTerminal.get(term) === SILENT_TERMINAL_NAME;
		const reason = wasMarkedSilent ? 'answered at last' : 'seat gone';
		const shellComm = psRows.find((r) => r.pid === shellPid)?.comm ?? '';
		lastAppliedByTerminal.delete(term);
		if (shellComm === '') {
			output.appendLine(
				`[${trigger}] terminal shell=${shellPid} → reset skipped (shell pid not in ps snapshot)`
			);
			return;
		}
		term.rename(shellComm);
		output.appendLine(
			`[${trigger}] terminal shell=${shellPid} → reset to "${shellComm}" (${reason})`
		);
		return;
	}
	if (lastAppliedByTerminal.get(term) === name) { return; }
	term.rename(name);
	lastAppliedByTerminal.set(term, name);
	output.appendLine(`[${trigger}] terminal shell=${shellPid} → "${name}"`);
}
