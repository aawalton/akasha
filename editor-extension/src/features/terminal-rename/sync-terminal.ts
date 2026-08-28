import * as vscode from 'vscode';
import { describeTerminal, type PidReading, PROCESS_ID_TIMEOUT_MS } from '../../seat/terminal-pids.ts';
import type { PsRow } from '../../seat/terminal-lookup.ts';
import { lastAppliedByTerminal, lastColorByTerminal, SILENT_TERMINAL_NAME } from './terminal-marks.ts';


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
		output.appendLine(
			`[${trigger}] terminal did not report a process within ` +
			`${PROCESS_ID_TIMEOUT_MS}ms — tab marked: ` +
			describeTerminal(term, index, of)
		);
		if (lastAppliedByTerminal.get(term) !== SILENT_TERMINAL_NAME) {
			term.rename(SILENT_TERMINAL_NAME);
			lastAppliedByTerminal.set(term, SILENT_TERMINAL_NAME);
		}
		return;
	}
	const shellPid = reading.pid;
	syncColor(term, name, seatAgentIds, colors, shellPid, trigger, output);
	if (name === undefined) {
		if (!lastAppliedByTerminal.has(term)) { return; }
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
