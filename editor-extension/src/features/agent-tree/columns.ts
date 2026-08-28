import * as vscode from 'vscode';
import { z } from 'zod';
import type { ColumnNumber } from '../../seat/editor-group.ts';
import { seatNamesOnDisk } from '../../seat/seat-page.ts';
import {
	loadPsRows,
	loadTmuxClients,
	type PsRow,
	seatNameForShellPid,
	type TmuxClient,
} from '../../seat/terminal-lookup.ts';
import {
	identified,
	type PidTally,
	readProcessIds,
	tally,
	tallyLine,
} from '../../seat/terminal-pids.ts';

const MEMENTO_KEY = 'opsAgentTree.lastSeenColumn';

const MAX_REMEMBERED = 200;

export interface SeatTerminal {
	readonly name: string;
	readonly terminal: vscode.Terminal;
	readonly column: ColumnNumber | undefined;
}

export function groupForTerminal(terminal: vscode.Terminal): ColumnNumber | undefined {
	for (const group of vscode.window.tabGroups.all) {
		for (const tab of group.tabs) {
			const input: unknown = tab.input;
			if (!(input instanceof vscode.TabInputTerminal)) { continue; }
			if (input.terminal === terminal) { return group.viewColumn; }
		}
	}
	return undefined;
}

export function tabInstanceIds(): ReadonlyMap<vscode.Terminal, number> {
	const found = new Map<vscode.Terminal, number>();
	for (const group of vscode.window.tabGroups.all) {
		for (const tab of group.tabs) {
			const input: unknown = tab.input;
			if (!(input instanceof vscode.TabInputTerminal)) { continue; }
			const { terminal, instanceId } = input;
			if (terminal === undefined || instanceId === undefined) { continue; }
			found.set(terminal, instanceId);
		}
	}
	return found;
}

export function openColumns(): readonly ColumnNumber[] {
	return vscode.window.tabGroups.all.map((group) => group.viewColumn);
}

export async function readSeatTerminals(
	seatNames: ReadonlySet<string>,
	psRows: readonly PsRow[],
	tmuxClients: readonly TmuxClient[] = []
): Promise<{
	readonly seats: readonly SeatTerminal[];
	readonly sweep: string;
	readonly counted: PidTally;
	readonly ms: number;
	readonly pidByTerminal: ReadonlyMap<vscode.Terminal, number>;
}> {
	const began = Date.now();
	const readings = await readProcessIds(vscode.window.terminals);
	const ms = Date.now() - began;
	const counted = tally(readings);
	const sweep = tallyLine(counted, ms);
	const found: SeatTerminal[] = [];
	const pidByTerminal = new Map<vscode.Terminal, number>();
	for (const { terminal, pid } of identified(readings)) {
		pidByTerminal.set(terminal, pid);
		const name = seatNameForShellPid(pid, seatNames, psRows, tmuxClients);
		if (name === undefined) { continue; }
		found.push({ name, terminal, column: groupForTerminal(terminal) });
	}
	return { seats: found, sweep, counted, ms, pidByTerminal };
}

export async function readSeatLookup(): Promise<{
	readonly seatNames: ReadonlySet<string>;
	readonly psRows: readonly PsRow[];
	readonly tmuxClients: readonly TmuxClient[];
}> {
	const psRows = await loadPsRows();
	if (psRows.length === 0) { return { seatNames: new Set<string>(), psRows, tmuxClients: [] }; }
	const [seatNames, tmuxClients] = await Promise.all([seatNamesOnDisk(), loadTmuxClients()]);
	return { seatNames, psRows, tmuxClients };
}

export interface ColumnMemory {
	readonly record: (seen: readonly SeatTerminal[]) => undefined;
	readonly recall: (seatName: string) => ColumnNumber | undefined;
}

export function createColumnMemory(memento: vscode.Memento): ColumnMemory {
	const remembered = new Map<string, ColumnNumber>(readStored(memento));

	return {
		record: (seen: readonly SeatTerminal[]) => {
			let changed = false;
			for (const { name, column } of seen) {
				if (column === undefined) { continue; }
				if (remembered.get(name) !== column) { changed = true; }
				remembered.delete(name);
				remembered.set(name, column);
			}
			while (remembered.size > MAX_REMEMBERED) {
				const oldest = remembered.keys().next();
				if (oldest.done === true) { break; }
				remembered.delete(oldest.value);
				changed = true;
			}
			if (changed) { void memento.update(MEMENTO_KEY, [...remembered.entries()]); }
			return undefined;
		},
		recall: (seatName: string) => remembered.get(seatName),
	};
}

const STORED_SCHEMA = z.array(z.tuple([z.string().min(1), z.number().int().min(1)]));

function readStored(memento: vscode.Memento): readonly (readonly [string, ColumnNumber])[] {
	const parsed = STORED_SCHEMA.safeParse(memento.get(MEMENTO_KEY));
	return parsed.success ? parsed.data : [];
}
