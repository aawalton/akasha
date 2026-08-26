/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

const MAX_TREE_HOPS = 20;

export type PsRow = { readonly pid: number; readonly ppid: number; readonly comm: string };

/**
 * How long `ps` is given before it is killed and the snapshot reads as empty.
 *
 * Bounded for the same reason `Terminal.processId` is: this is awaited on the
 * way to a rename, and a subprocess that never exits would wedge the caller with
 * nothing in the chain to give up. `timeout` makes execFile kill the child and
 * reject, which the catch below already turns into an empty table.
 */
const PS_TIMEOUT_MS = 5_000;

/** One `ps` snapshot of the whole process table. Failure reads as an empty table. */
export async function loadPsRows(): Promise<readonly PsRow[]> {
	let stdout: string;
	try {
		({ stdout } = await execFileP('ps', ['-Ao', 'pid=,ppid=,comm='], {
			timeout: PS_TIMEOUT_MS,
		}));
	} catch {
		return [];
	}
	const rows: PsRow[] = [];
	for (const line of stdout.split('\n')) {
		const trimmed = line.trim();
		if (trimmed === '') { continue; }
		const firstSep = trimmed.indexOf(' ');
		if (firstSep < 0) { continue; }
		const pidStr = trimmed.slice(0, firstSep);
		const rest = trimmed.slice(firstSep).trimStart();
		const secondSep = rest.indexOf(' ');
		if (secondSep < 0) { continue; }
		const ppidStr = rest.slice(0, secondSep);
		const comm = rest.slice(secondSep).trim();
		const pid = Number(pidStr);
		const ppid = Number(ppidStr);
		if (!Number.isFinite(pid) || !Number.isFinite(ppid)) { continue; }
		rows.push({ pid, ppid, comm });
	}
	return rows;
}

/**
 * The candidate pid descended from `shellPid`, walking each candidate up its
 * parent chain until it reaches the shell. Hops are capped so a malformed or
 * cyclic table cannot spin.
 *
 * GENERIC OVER WHAT IS BEING LOOKED FOR rather than named for its one caller, because descent
 * is the whole of it and the thing descended to has changed once already.
 */
export function findDescendant(
	shellPid: number,
	psRows: readonly PsRow[],
	candidatePids: ReadonlySet<number>
): number | undefined {
	if (candidatePids.size === 0) { return undefined; }
	const byPid = new Map(psRows.map((r) => [r.pid, r]));
	for (const r of psRows) {
		if (!candidatePids.has(r.pid)) { continue; }
		let cur: PsRow | undefined = r;
		let hops = 0;
		while (cur !== undefined && hops++ < MAX_TREE_HOPS) {
			if (cur.ppid === shellPid) { return r.pid; }
			cur = byPid.get(cur.ppid);
		}
	}
	return undefined;
}

/** One attached tmux client: the client process, and the session it is showing. */
export type TmuxClient = { readonly pid: number; readonly session: string };

/**
 * Every attached tmux client, as pid and session name.
 *
 * WHY THE CLIENT AND NOT THE SUPERVISOR. A seat's tmux SERVER is launched inside
 * `systemd-run --user --scope`, so it is reparented to the systemd user manager and no descent
 * from a tab's shell ever reaches the supervisor under it. That reparenting is deliberate — it
 * is what makes a seat outlive the editor quitting.
 *
 * THE CLIENT IS NOT REPARENTED. `tmux attach-session` runs in the terminal, as a
 * child of the tab's own shell, and it knows which session it is attached to.
 * Measured 2026-08-13: client 2272876 under bash 3404066 under the pty host,
 * showing session `amy-readouts`, whose supervisor entry sat at pid 2272916.
 *
 * The session name IS the seat name rather than merely matching it:
 * `_aw_tmux_launch` passes one seat variable both to `new-session -s` and to the
 * supervisor it launches, so there is no second spelling to drift.
 *
 * Failure and no tmux installed both read as no clients, which is a window holding no seat
 * terminal rather than a fault.
 */
export async function loadTmuxClients(): Promise<readonly TmuxClient[]> {
	let stdout: string;
	try {
		({ stdout } = await execFileP('tmux', ['list-clients', '-F', '#{client_pid} #{session_name}'], {
			timeout: PS_TIMEOUT_MS,
		}));
	} catch {
		// No server running exits non-zero, and so does tmux being absent. Neither is
		// a fault here: it means this window holds no tmux seats to resolve.
		return [];
	}
	const clients: TmuxClient[] = [];
	for (const line of stdout.split('\n')) {
		const trimmed = line.trim();
		if (trimmed === '') { continue; }
		const sep = trimmed.indexOf(' ');
		if (sep < 0) { continue; }
		const pid = Number(trimmed.slice(0, sep));
		const session = trimmed.slice(sep + 1).trim();
		// A session name is allowed to contain spaces, so everything after the first
		// gap is the name. An empty one is dropped rather than matched against.
		if (!Number.isFinite(pid) || session === '') { continue; }
		clients.push({ pid, session });
	}
	return clients;
}

/**
 * The seat a terminal's shell process is running, resolved through the process tree to the tmux
 * client under it.
 *
 * THE TAB LABEL IS NOT A HANDLE. Resolving through the process tree is the only reading that
 * stays true for a terminal nobody has looked at, so neither this nor its callers ever read a
 * tab's name back.
 *
 * THE CLIENT IS WHAT IS DESCENDED TO. `tmux attach-session` runs in the terminal, as a child of
 * the tab's own shell, and it knows which session it is attached to. Nothing descends to a
 * supervisor: every one of them is reparented under the tmux server, so that walk reaches none.
 *
 * THE SESSION NAME IS THE SEAT NAME rather than merely matching it: one seat variable is passed
 * both to `new-session -s` and to the supervisor launched under it, and renaming a seat renames
 * its session, so there is no second spelling to drift.
 *
 * THE ANSWER IS CHECKED AGAINST THE SEAT PAGES rather than returned on the session name alone.
 * Alan runs tmux for things that are not seats, and a session called `notes` would otherwise put
 * that name on a tab running no agent. No page, no name, and the caller falls through exactly as
 * it does for a terminal running nothing.
 */
export function seatNameForShellPid(
	shellPid: number,
	seatNames: ReadonlySet<string>,
	psRows: readonly PsRow[],
	tmuxClients: readonly TmuxClient[] = []
): string | undefined {
	if (tmuxClients.length === 0) { return undefined; }
	const clientPid = findDescendant(shellPid, psRows, new Set(tmuxClients.map((c) => c.pid)));
	if (clientPid === undefined) { return undefined; }
	const session = tmuxClients.find((c) => c.pid === clientPid)?.session;
	if (session === undefined) { return undefined; }
	return seatNames.has(session) ? session : undefined;
}
