/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview Which window a per-window record belongs to, and whether that window is still there.
 *
 * WHY NOT `vscode.env.sessionId`, WHICH IS WHAT THIS REPLACES. It reads
 * `initData.telemetryInfo.sessionId`, which the extension host takes from the
 * registered telemetry service. Where telemetry is off the service is
 * `NullTelemetryServiceShape`, whose `sessionId` is the literal constant
 * `someValue.sessionId` — see `src/vs/platform/telemetry/common/telemetryUtils.ts`.
 * Every served instance of this fork therefore reports the same "session".
 *
 * MEASURED RATHER THAN REASONED, because the two hosts do not agree and reading
 * only one of them is how this got shipped wrong the first time. On 2026-08-13
 * Alan's desktop windows wrote records named `7ecd9f13-…` and `b267a0e0-…`, two
 * distinct ids; a code-server driven beside them wrote `someValue.sessionId`. So
 * the API is per-window in one host and a constant in the other, and a record
 * keyed on it silently merges every served window into one file. Two live windows
 * then produce one coherent record, with a live writer pid, describing neither of
 * them — and `pages/domain/code-editor.domain.md` states as Design that the desktop
 * application and the served browser both run and neither replaces the other.
 *
 * A VERIFIER'S OWN INSTANCE IS A SERVED ONE, which is what makes this worse than
 * an untidy filename: driving a second window to read the record is what destroys
 * the record being read.
 *
 * SO THE IDENTITY IS THE EXTENSION HOST PROCESS, which is per-window by
 * construction rather than by an API's cooperation, and which every record here
 * already carried as `writer` for liveness. The filename and the liveness answer
 * become one fact.
 *
 * THE START TIME IS THE HALF THAT IS EASY TO DROP. A pid alone stops being unique
 * the moment the operating system reuses it, and a record whose window was killed
 * sits on disk until something removes it — so a stale record can come to name a
 * live unrelated process and read as current. `starttime` from `/proc/<pid>/stat`
 * pins the identity to one run of one process. Reading `/proc` is a built-in this
 * repository already uses rather than a dependency.
 */
import { readFile } from 'node:fs/promises';

/** One run of one extension host process. */
export interface WindowIdentity {
	readonly pid: number;
	/**
	 * The process's start time in clock ticks since boot, as `/proc` reports it.
	 *
	 * Opaque and only ever compared for equality: what it is worth is that the
	 * kernel will not report the same pair twice.
	 */
	readonly startedAt: number;
}

/**
 * The start time out of the contents of `/proc/<pid>/stat`.
 *
 * PARSED FROM THE LAST `)` RATHER THAN BY SPLITTING THE WHOLE LINE. The second
 * field is the executable name in parentheses and it can itself contain spaces
 * and parentheses, so counting fields from the left goes wrong on exactly the
 * processes whose names are least predictable. Everything after the final `)` is
 * fixed-width in fields, and `starttime` is field 22 overall — index 19 there.
 */
export function parseProcessStart(stat: string): number | undefined {
	const afterComm = stat.lastIndexOf(')');
	if (afterComm === -1) { return undefined; }
	const fields = stat.slice(afterComm + 1).trim().split(/\s+/);
	const raw = fields[19];
	if (raw === undefined) { return undefined; }
	const parsed = Number(raw);
	return Number.isFinite(parsed) ? parsed : undefined;
}

/** Whether two identities are the same run of the same process. */
export function sameWindow(
	one: WindowIdentity,
	other: WindowIdentity | undefined
): boolean {
	return other !== undefined && one.pid === other.pid && one.startedAt === other.startedAt;
}

/**
 * This process's own identity, or the pid alone where `/proc` could not say.
 *
 * A START TIME OF ZERO IS "NOT KNOWN" rather than a real reading, and it compares
 * equal only to another unknown. On a system with no `/proc` this degrades to the
 * pid check the records already had, which is weaker than this and not wrong.
 */
export async function readWindowIdentity(pid: number): Promise<WindowIdentity> {
	return { pid, startedAt: (await readProcessStart(pid)) ?? 0 };
}

async function readProcessStart(pid: number): Promise<number | undefined> {
	try {
		return parseProcessStart(await readFile(`/proc/${pid}/stat`, 'utf8'));
	} catch {
		// Gone, or unreadable. Both mean this cannot be pinned any further.
		return undefined;
	}
}

/**
 * One run of one process, written the way a page states it.
 *
 * `pages/page-property-type/process.page-property-type.md` states this
 * shape: the pid and the start time joined by a hyphen, one value rather than two fields, so that
 * nothing downstream can compare the pid on its own and match a number the kernel has reused.
 */
export async function readProcess(pid: number): Promise<string> {
	const identity = await readWindowIdentity(pid);
	return `${identity.pid}-${identity.startedAt}`;
}

/**
 * Whether the window that wrote a record is still running.
 *
 * The pid being alive is not enough on its own: that is true again as soon as the
 * number is reused, and a record left behind by a killed window is exactly the
 * one that sits around long enough for that to happen.
 */
export async function isWindowLive(identity: WindowIdentity): Promise<boolean> {
	const now = await readProcessStart(identity.pid);
	if (now === undefined) { return false; }
	// A record written where `/proc` could not be read carries zero, and there is
	// nothing to compare — the pid answering at all is the whole answer available.
	if (identity.startedAt === 0) { return true; }
	return now === identity.startedAt;
}

/**
 * The file name a window's record is written under.
 *
 * The pid alone, with the start time kept inside the record rather than in the
 * name: a reader globs this directory rather than knowing a pid in advance, so
 * what the name has to do is keep two live windows apart, and what settles
 * liveness is read from the contents once the file is open anyway.
 */
export function recordNameFor(identity: WindowIdentity): string {
	return `${identity.pid}.json`;
}
