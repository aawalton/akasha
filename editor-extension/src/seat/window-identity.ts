import { readFile } from 'node:fs/promises';

export interface WindowIdentity {
	readonly pid: number;
	readonly startedAt: number;
}

export function parseProcessStart(stat: string): number | undefined {
	const afterComm = stat.lastIndexOf(')');
	if (afterComm === -1) { return undefined; }
	const fields = stat.slice(afterComm + 1).trim().split(/\s+/);
	const raw = fields[19];
	if (raw === undefined) { return undefined; }
	const parsed = Number(raw);
	return Number.isFinite(parsed) ? parsed : undefined;
}

export function sameWindow(
	one: WindowIdentity,
	other: WindowIdentity | undefined
): boolean {
	return other !== undefined && one.pid === other.pid && one.startedAt === other.startedAt;
}

export async function readWindowIdentity(pid: number): Promise<WindowIdentity> {
	return { pid, startedAt: (await readProcessStart(pid)) ?? 0 };
}

async function readProcessStart(pid: number): Promise<number | undefined> {
	try {
		return parseProcessStart(await readFile(`/proc/${pid}/stat`, 'utf8'));
	} catch {
		return undefined;
	}
}

export async function readProcess(pid: number): Promise<string> {
	const identity = await readWindowIdentity(pid);
	return `${identity.pid}-${identity.startedAt}`;
}

export async function isWindowLive(identity: WindowIdentity): Promise<boolean> {
	const now = await readProcessStart(identity.pid);
	if (now === undefined) { return false; }
	if (identity.startedAt === 0) { return true; }
	return now === identity.startedAt;
}

export function recordNameFor(identity: WindowIdentity): string {
	return `${identity.pid}.json`;
}
