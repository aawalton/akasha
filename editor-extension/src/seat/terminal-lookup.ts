import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

const MAX_TREE_HOPS = 20;

export type PsRow = { readonly pid: number; readonly ppid: number; readonly comm: string };

const PS_TIMEOUT_MS = 5_000;

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

export type TmuxClient = { readonly pid: number; readonly session: string };

export async function loadTmuxClients(): Promise<readonly TmuxClient[]> {
	let stdout: string;
	try {
		({ stdout } = await execFileP('tmux', ['list-clients', '-F', '#{client_pid} #{session_name}'], {
			timeout: PS_TIMEOUT_MS,
		}));
	} catch {
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
		if (!Number.isFinite(pid) || session === '') { continue; }
		clients.push({ pid, session });
	}
	return clients;
}

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
