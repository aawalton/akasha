/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import {
	findDescendant,
	type PsRow,
	seatNameForShellPid,
	type TmuxClient,
} from './terminal-lookup';

describe('findDescendant', () => {
	// A malformed or cyclic process table must not spin. The hop cap is what bounds
	// it, and a cycle that never reaches the shell is the case that would.
	test('returns rather than spinning on a parent chain that closes on itself', () => {
		const cyclic: readonly PsRow[] = [
			{ pid: 10, ppid: 11, comm: 'a' },
			{ pid: 11, ppid: 10, comm: 'b' },
		];
		expect(findDescendant(100, cyclic, new Set([10, 11]))).toBeUndefined();
	});
});

/**
 * The shape a seat actually has, measured 2026-08-13.
 *
 * Shell 300 holds an attached tmux client at 310. The SERVER is at 900 under pid 1 — reparented
 * out of the tab's tree by `systemd-run --user --scope` — so the supervisor at 910 under it is
 * unreachable by descent from any tab's shell, and nothing here tries. Shell 100 holds a
 * supervisor at 120 directly, which is a shape no seat on this machine has: it stands for a
 * terminal running something that is not a seat.
 */
const TMUX_PS: readonly PsRow[] = [
	{ pid: 1, ppid: 0, comm: 'init' },
	{ pid: 100, ppid: 1, comm: 'bash' },
	{ pid: 120, ppid: 100, comm: 'supervisor' },
	{ pid: 300, ppid: 1, comm: 'bash' },
	{ pid: 310, ppid: 300, comm: 'tmux: client' },
	{ pid: 900, ppid: 1, comm: 'tmux: server' },
	{ pid: 910, ppid: 900, comm: 'supervisor' },
];

const TMUX_CLIENTS: readonly TmuxClient[] = [{ pid: 310, session: 'amy-readouts' }];

/** The seats that have a page right now, which is what a session name is checked against. */
const SEATS = new Set(['amy-readouts', 'amy-code-editor-lead']);

describe('seatNameForShellPid', () => {
	// The whole reading, end to end: the tab's shell holds the client, the client holds the
	// session, and the session name is the seat name. It comes from descent rather than from the
	// tab's label, so it is right for a terminal nobody has looked at — a label is only whatever
	// the last rename wrote.
	test('names the tmux seat whose client descends from this shell', () => {
		expect(seatNameForShellPid(300, SEATS, TMUX_PS, TMUX_CLIENTS)).toBe('amy-readouts');
	});

	// tmux absent, or its server not running, reads as no clients, and a window with no clients
	// holds no seat terminal. There is no second arm to fall to, so the honest answer is nothing
	// rather than a name taken off the process table alone.
	test('names nothing when tmux answers with no clients', () => {
		expect(seatNameForShellPid(300, SEATS, TMUX_PS)).toBeUndefined();
	});

	// Alan runs tmux for things that are not seats. A seat's page stands while an agent is present
	// in it, so a session with no page behind it must not put that name on a tab running no agent.
	test('names nothing for a tmux session that has no seat page', () => {
		const stray: readonly TmuxClient[] = [{ pid: 310, session: 'notes' }];
		expect(seatNameForShellPid(300, SEATS, TMUX_PS, stray)).toBeUndefined();
	});

	// A client under someone else's shell is not this tab's seat. Answering with the only session
	// on the server would put a seat's name on a tab, and send a click, to an unrelated terminal.
	test('names nothing for a shell with no tmux client under it', () => {
		expect(seatNameForShellPid(100, SEATS, TMUX_PS, TMUX_CLIENTS)).toBeUndefined();
	});
});
