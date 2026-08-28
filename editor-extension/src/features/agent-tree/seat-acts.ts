/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { runOps } from '../../harness-call.ts';
import { seatTerminalOptions } from '../../seat/editor-group.ts';
import { readSeatLookup } from './columns.ts';
import { attachCommandLine, resumePrompt, type SeatStep } from './toggles.ts';
import { type ToggleTarget } from './invoked-seat.ts';
import { columnForSeat, terminalForSeat } from './show-seat.ts';
import { output } from './tree-state.ts';

/**
 * The ceiling on one `ops` call. A revive hydrates a transcript from the object
 * store and is the slowest of them; past this the call has not worked, and saying
 * so beats a toggle that never comes back.
 */
const OPS_TIMEOUT_MS = 120_000;

/**
 * Seats with a plan running, so a second click on the same row cannot interleave
 * with the first. The two toggles compose into stop-then-revive sequences, and two
 * of those over one seat would race for its supervisor.
 */
const inFlight = new Set<string>();

/**
 * Runs a plan's steps in order, stopping at the first that fails.
 *
 * A LATER STEP IS NOT ATTEMPTED OVER A FAILED ONE. The sequences here stop a seat
 * before bringing it back, so running on past a failure is how a seat ends up
 * stopped by a toggle that was asked to move it.
 */
export async function performPlan(
	seat: ToggleTarget,
	steps: readonly SeatStep[],
	trigger: string
): Promise<undefined> {
	if (inFlight.has(seat.id)) {
		output.appendLine(`[${trigger}] ${seat.name}: already acting on this seat, ignoring`);
		return undefined;
	}
	inFlight.add(seat.id);
	try {
		for (const step of steps) {
			try {
				await performStep(seat, step);
				output.appendLine(`[${trigger}] ${seat.name}: ${step.kind} ok`);
			} catch (err) {
				output.appendLine(`[${trigger}] ${seat.name}: ${step.kind} failed: ${String(err)}`);
				void vscode.window.showErrorMessage(`${seat.name}: could not ${step.kind}. ${String(err)}`);
				return undefined;
			}
		}
	} finally {
		inFlight.delete(seat.id);
	}
	return undefined;
}

async function performStep(seat: ToggleTarget, step: SeatStep): Promise<undefined> {
	switch (step.kind) {
		case 'stop':
			await runSeatOps(['seat', 'stop', seat.id]);
			return undefined;
		case 'revive': {
			// DRIVEN, NEVER BARE. The prompt rides argv, where there is no message row to
			// lose and the seat cannot start without it; `revive` bare comes back idle and
			// `revive` then `send` races the boot.
			//
			// FETCHED BEFORE THE REVIVE, so a tree this window cannot reach refuses the
			// step instead of reviving a seat and then finding nothing to hand it. The
			// throw lands in `performPlan`, which tells Alan and attempts no later step.
			const prompt = await resumePrompt();
			await runSeatOps(['seat', 'resume', seat.id, '--prompt', prompt]);
			return undefined;
		}
		case 'state-place':
			await runSeatOps(['instructions', 'seat', '--agent', seat.id, '--mode', step.place]);
			return undefined;
		case 'resume-interactive':
			return resumeInteractive(seat);
		case 'attach':
			// The name is guarded here, before a terminal is opened, so a refusal leaves none
			// standing with nothing running in it.
			return attachTerminal(seat, attachCommandLine(seat.name));
		case 'detach':
			return detachTerminal(seat);
		case 'reset':
			await runSeatOps(['seat', 'reset', seat.id]);
			return undefined;
		default: {
			// Exhaustiveness, asserted by the compiler rather than by an import: a step
			// kind added to the plan without an arm here fails to assign to `never` and
			// the build says so. Written out because this feature reaches for nothing in
			// the code repository any more, and one narrowing helper is not a reason to.
			const unreached: never = step;
			throw new Error(`unknown seat step: ${JSON.stringify(unreached)}`);
		}
	}
}

/**
 * Runs `ops` for a seat action, at this feature's ceiling.
 *
 * IT WAS BROKEN THE SAME WAY THE PANELS WERE, and reported only when Alan clicked. This wrapped its
 * call in `/bin/bash -lc` on the belief that a login shell put `bun` on the PATH for the `ops`
 * shebang. It does not, so every right-click action here died at `ops` line 24 with
 * `exec: bun: not found` — the same fault, hidden behind an action nobody had used since the
 * restart rather than behind an empty panel. `harness-call` is where that is now decided.
 */
async function runSeatOps(args: readonly string[]): Promise<undefined> {
	await runOps(args, { timeout: OPS_TIMEOUT_MS, maxBuffer: 1024 * 1024 });
	return undefined;
}

/**
 * Brings a seat back interactively: `ops` resumes it, and a terminal attaches.
 *
 * TWO ACTS RATHER THAN ONE TYPED LINE. `ops seat resume --start-mode interactive`
 * takes a live holder over — so this is the whole act for a running seat as well as
 * a stopped one — materialises the transcript, and launches the supervisor DETACHED
 * under the seat's own name. The terminal then attaches to that session. Nothing
 * about the seat is decided by what is typed into the terminal, so a terminal Alan
 * closes leaves the seat running and one he opens later finds it again.
 *
 * NO SHELL STANDS BETWEEN. This used to type `sr` — a bash function generated from
 * the instructions repo — into the terminal and let the shell resolve it. `ops` is
 * called directly now, which is the act every other step in this file takes.
 *
 * The terminal is shown because this runs under Alan's own click, which is the one
 * place this feature moves focus.
 *
 * IT IS PLACED BY THE SAME RULE THE CLICK PATH USES. `columnForSeat` is called here
 * for exactly the reason it is called in `showSeat` — a seat coming back has no
 * terminal in this window, so the group has to be chosen rather than read. Created
 * without a location, as this was until #18931, the terminal goes to the panel Alan
 * keeps closed; there is no second rule for the resume path and this must not grow
 * one.
 */
async function resumeInteractive(seat: ToggleTarget): Promise<undefined> {
	// ASKED FOR BEFORE ANYTHING RUNS, because this is where a name outside the seat-name alphabet
	// is refused, and a refusal after the resume would leave a seat running with nothing attached
	// to it in Alan's window.
	const line = attachCommandLine(seat.name);
	await runSeatOps(['seat', 'resume', seat.id, '--start-mode', 'interactive']);
	return attachTerminal(seat, line);
}

/**
 * Opens a terminal in this window attached to a seat's session.
 *
 * IT IS PLACED BY THE SAME RULE THE CLICK PATH USES. `columnForSeat` is called here
 * for exactly the reason it is called in `showSeat` — a seat being attached to has no
 * terminal in this window, so the group has to be chosen rather than read. Created
 * without a location, as this was until #18931, the terminal goes to the panel Alan
 * keeps closed; there is no second rule for this path and it must not grow one.
 *
 * The terminal is shown because this runs under Alan's own click, which is the one
 * place this feature moves focus.
 */
async function attachTerminal(seat: ToggleTarget, line: string): Promise<undefined> {
	// Read at the moment of the attach rather than from the poll's sample, for the
	// same reason the click path re-reads: groups open and close between polls.
	const { seatNames, psRows, tmuxClients } = await readSeatLookup();
	const column = await columnForSeat(seat, seatNames, psRows, tmuxClients);
	output.appendLine(
		`[attach] ${seat.name}: terminal in column ${column.column} (${column.reason})`
	);
	const terminal = vscode.window.createTerminal(seatTerminalOptions(seat.name, column.column));
	terminal.sendText(line);
	terminal.show();
	return undefined;
}

/**
 * Closes this window's terminal on a seat, leaving the session running.
 *
 * DISPOSING THE TERMINAL IS THE DETACH. The terminal holds a tmux client; ending it
 * ends the client and tmux keeps the session, which is the whole mechanism — there
 * is no `tmux detach-client` to send, because sending anything would mean typing
 * into the very terminal being taken away.
 *
 * A SEAT WITH NO TERMINAL HERE IS ALREADY WHERE IT IS BEING ASKED TO GO, so this
 * says so and succeeds. Failing would make the place toggle refuse on a seat Alan
 * is watching from another window, which is not a fault in either.
 */
async function detachTerminal(seat: ToggleTarget): Promise<undefined> {
	const { seatNames, psRows, tmuxClients } = await readSeatLookup();
	const terminal = await terminalForSeat(seat.name, seatNames, psRows, tmuxClients);
	if (terminal === undefined) {
		output.appendLine(`[detach] ${seat.name}: no terminal in this window, nothing to close`);
		return undefined;
	}
	terminal.dispose();
	output.appendLine(`[detach] ${seat.name}: terminal closed, session left running`);
	return undefined;
}
