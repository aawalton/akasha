import * as vscode from 'vscode';
import { runOps } from '../../harness-call.ts';
import { seatTerminalOptions } from '../../seat/editor-group.ts';
import { readSeatLookup } from './columns.ts';
import { attachCommandLine, resumePrompt, type SeatStep } from './toggles.ts';
import { type ToggleTarget } from './invoked-seat.ts';
import { columnForSeat, terminalForSeat } from './show-seat.ts';
import { output } from './tree-state.ts';

const OPS_TIMEOUT_MS = 120_000;

const inFlight = new Set<string>();

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
			return attachTerminal(seat, attachCommandLine(seat.name));
		case 'detach':
			return detachTerminal(seat);
		case 'reset':
			await runSeatOps(['seat', 'reset', seat.id]);
			return undefined;
		default: {
			const unreached: never = step;
			throw new Error(`unknown seat step: ${JSON.stringify(unreached)}`);
		}
	}
}

async function runSeatOps(args: readonly string[]): Promise<undefined> {
	await runOps(args, { timeout: OPS_TIMEOUT_MS, maxBuffer: 1024 * 1024 });
	return undefined;
}

async function resumeInteractive(seat: ToggleTarget): Promise<undefined> {
	const line = attachCommandLine(seat.name);
	await runSeatOps(['seat', 'resume', seat.id, '--start-mode', 'interactive']);
	return attachTerminal(seat, line);
}

async function attachTerminal(seat: ToggleTarget, line: string): Promise<undefined> {
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
