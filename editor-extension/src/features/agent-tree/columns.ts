/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Reading which editor group each seat's terminal sits in, and remembering it
 * past the seat.
 *
 * WHY ANYTHING IS REMEMBERED AT ALL. A seat that has stopped has no terminal, so
 * at the moment its transcript is asked for there is nothing left to read a group
 * off. The group has to be written down while the session is alive. Nothing else
 * in the fleet records it — not the agent row, not the supervisor entry, not the
 * session sentinel — so this store is the only carrier.
 *
 * IT IS SAMPLED ON THE TREE'S OWN POLL rather than on a watcher of its own. A
 * terminal does not announce moving between groups, and the poll is already
 * paying for the `ps` snapshot this needs.
 *
 * `globalState` rather than `workspaceState`: a seat is a fleet-wide thing and
 * Alan opens the same seats from more than one folder. It survives a window
 * reload, which is the case the store exists for — a seat that stopped is
 * usually asked for after one.
 */
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

/**
 * How many seats the store keeps. The fleet turns over constantly and this is
 * keyed by seat name, so without a bound it would grow for the life of the
 * profile. The most recently seen are the ones a click is about.
 */
const MAX_REMEMBERED = 200;

/** One seat's terminal, and the group it was found in. */
export interface SeatTerminal {
	readonly name: string;
	readonly terminal: vscode.Terminal;
	readonly column: ColumnNumber | undefined;
}

/**
 * The editor group holding a terminal.
 *
 * `TabInputTerminal.terminal` is Alan's fork's addition and is what makes this
 * answerable; matching on `Tab.label` is not a substitute, since a label is a
 * display title that the rename feature next door changes under it.
 *
 * `undefined` covers three cases that are one answer here: the terminal is in the
 * panel rather than the editor area, the tab model has not caught up with it yet,
 * and the window is running a bundle built before the fork carried the property
 * at all. None of them is a group, and the caller falls through the same way for
 * each.
 */
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

/**
 * The terminal editor tabs open in this window, as terminal to instance id.
 *
 * READ FRESH BY EVERY CALLER rather than remembered with the sweep. An id is in the
 * answer because a tab in this window holds that terminal at the moment of the call, so a
 * tab that has been closed — or a terminal moved out of the editor area into the panel —
 * simply is not here. A caller publishing these as the ids a menu clause matches is
 * therefore unable to carry one for a tab that is gone.
 *
 * `TabInputTerminal` carries both halves of the join: `terminal` names the instance to
 * this extension, and `instanceId` names the same tab to a `when` clause, which reads it
 * as `resourceFilename`. Either is `undefined` for a tab whose terminal this extension
 * host does not know, and such a tab is passed over rather than half-matched.
 */
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

/** The groups open in this window, as column numbers. */
export function openColumns(): readonly ColumnNumber[] {
	return vscode.window.tabGroups.all.map((group) => group.viewColumn);
}

/**
 * Every terminal in this window that resolves to a seat, with the group holding
 * it.
 *
 * The seat is resolved through the process tree at the moment of the call, which
 * is the same lookup the click and the rename feature use and the reason neither
 * trusts a tab label.
 */
export async function readSeatTerminals(
	seatNames: ReadonlySet<string>,
	psRows: readonly PsRow[],
	tmuxClients: readonly TmuxClient[] = []
): Promise<{
	readonly seats: readonly SeatTerminal[];
	readonly sweep: string;
	/**
	 * The same sweep as data rather than as a log line, for the observation record.
	 *
	 * RETURNED RATHER THAN RECORDED HERE, because this function has two callers in
	 * two different features — `agent-tree` samples it on every poll and
	 * `editor-layout` runs it on every write — and a sweep recorded from inside
	 * would land under whichever name this module picked for both. Each caller
	 * records its own under its own name.
	 */
	readonly counted: PidTally;
	readonly ms: number;
	/**
	 * The shell process of every terminal that answered, seat or not.
	 *
	 * TERMINALS WITH NO SEAT ARE IN HERE TOO, which is what separates it from `seats`
	 * above. `editor-layout` writes a page per terminal and a bare shell is as much a
	 * terminal as one running a seat; reading the pids a second time to find them
	 * would pay the bounded sweep twice for one window.
	 */
	readonly pidByTerminal: ReadonlyMap<vscode.Terminal, number>;
}> {
	// BOUNDED, AND ONCE FOR THE WHOLE SWEEP. This used to await each terminal in
	// turn with nothing to give up on, so one terminal whose pty the host could
	// not find again held the sweep for good — and this is the first thing the
	// refresh does, which is how it left Alan's panel on "Reading the fleet…"
	// through a whole session on 2026-08-13. Reading them together against one
	// deadline is also what keeps eight dead terminals from costing eight bounds.
	//
	// THE SWEEP IS TIMED AND COUNTED because the bound being paid is invisible
	// otherwise. Alan's activation log put agent-tree at 5295ms and 5303ms on two
	// consecutive sessions against 220-372ms for the panels that do not sweep —
	// the bound plus the work already accounted for, twice, which is what says
	// some terminal here is never answering. Nothing on screen or in this log said
	// so, and the arithmetic was the only way to find out.
	const began = Date.now();
	const readings = await readProcessIds(vscode.window.terminals);
	const ms = Date.now() - began;
	const counted = tally(readings);
	const sweep = tallyLine(counted, ms);
	const found: SeatTerminal[] = [];
	const pidByTerminal = new Map<vscode.Terminal, number>();
	// A terminal that could not say what it is running is not here to be guessed
	// at: `identified` has already dropped it.
	for (const { terminal, pid } of identified(readings)) {
		pidByTerminal.set(terminal, pid);
		const name = seatNameForShellPid(pid, seatNames, psRows, tmuxClients);
		if (name === undefined) { continue; }
		found.push({ name, terminal, column: groupForTerminal(terminal) });
	}
	return { seats: found, sweep, counted, ms, pidByTerminal };
}

/** The process table, the seats that have a page, and the attached tmux clients, read together. */
export async function readSeatLookup(): Promise<{
	readonly seatNames: ReadonlySet<string>;
	readonly psRows: readonly PsRow[];
	readonly tmuxClients: readonly TmuxClient[];
}> {
	const psRows = await loadPsRows();
	// No process table is no lookup: `seatNamesOnDisk` would answer, but nothing could
	// be matched against it, so the read is skipped rather than paid for. The tmux
	// clients are skipped on the same reasoning — they are matched through the same
	// table, so without one there is nothing to walk them up.
	if (psRows.length === 0) { return { seatNames: new Set<string>(), psRows, tmuxClients: [] }; }
	const [seatNames, tmuxClients] = await Promise.all([seatNamesOnDisk(), loadTmuxClients()]);
	return { seatNames, psRows, tmuxClients };
}

/** Where each seat's terminal was last seen, keyed by seat name. */
export interface ColumnMemory {
	/** Records every seat found in an editor group, dropping the oldest past the cap. */
	readonly record: (seen: readonly SeatTerminal[]) => undefined;
	readonly recall: (seatName: string) => ColumnNumber | undefined;
}

export function createColumnMemory(memento: vscode.Memento): ColumnMemory {
	// Read once at activation and held in memory: the store is written far more
	// often than it is read, and a poll must not pay a deserialize per tick.
	const remembered = new Map<string, ColumnNumber>(readStored(memento));

	return {
		record: (seen: readonly SeatTerminal[]) => {
			let changed = false;
			for (const { name, column } of seen) {
				if (column === undefined) { continue; }
				if (remembered.get(name) !== column) { changed = true; }
				// Delete before set, so insertion order is recency order and the cap
				// below trims the least recently seen. A plain overwrite keeps a Map key
				// in the position it first took, which would trim the newest instead.
				remembered.delete(name);
				remembered.set(name, column);
			}
			while (remembered.size > MAX_REMEMBERED) {
				const oldest = remembered.keys().next();
				if (oldest.done === true) { break; }
				remembered.delete(oldest.value);
				changed = true;
			}
			// A tick that only reordered is left unwritten. The map in hand is already
			// right, and the next real change carries the order with it.
			if (changed) { void memento.update(MEMENTO_KEY, [...remembered.entries()]); }
			return undefined;
		},
		recall: (seatName: string) => remembered.get(seatName),
	};
}

/**
 * The stored shape: seat name to column, most recently seen last. Pairs rather
 * than an object because insertion order is the recency the cap trims against,
 * and an object's key order is not something to rest that on.
 */
const STORED_SCHEMA = z.array(z.tuple([z.string().min(1), z.number().int().min(1)]));

/**
 * What the memento holds, parsed rather than trusted.
 *
 * ALL OR NOTHING, deliberately. This code is the only writer, so a single
 * malformed pair says the value came from something else — a profile carried
 * across a version that stored a different shape — rather than that one seat went
 * bad. The honest answer to a store that is not this store is that nothing is
 * remembered, and the next poll rebuilds it from the window anyway.
 */
function readStored(memento: vscode.Memento): readonly (readonly [string, ColumnNumber])[] {
	const parsed = STORED_SCHEMA.safeParse(memento.get(MEMENTO_KEY));
	return parsed.success ? parsed.data : [];
}
