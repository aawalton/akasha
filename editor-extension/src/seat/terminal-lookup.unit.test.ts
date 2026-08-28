import { describe, expect, test } from 'bun:test';
import {
	findDescendant,
	type PsRow,
	seatNameForShellPid,
	type TmuxClient,
} from './terminal-lookup.ts';

describe('findDescendant', () => {
	test('returns rather than spinning on a parent chain that closes on itself', () => {
		const cyclic: readonly PsRow[] = [
			{ pid: 10, ppid: 11, comm: 'a' },
			{ pid: 11, ppid: 10, comm: 'b' },
		];
		expect(findDescendant(100, cyclic, new Set([10, 11]))).toBeUndefined();
	});
});

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

const SEATS = new Set(['amy-readouts', 'amy-code-editor-lead']);

describe('seatNameForShellPid', () => {
	test('names the tmux seat whose client descends from this shell', () => {
		expect(seatNameForShellPid(300, SEATS, TMUX_PS, TMUX_CLIENTS)).toBe('amy-readouts');
	});

	test('names nothing when tmux answers with no clients', () => {
		expect(seatNameForShellPid(300, SEATS, TMUX_PS)).toBeUndefined();
	});

	test('names nothing for a tmux session that has no seat page', () => {
		const stray: readonly TmuxClient[] = [{ pid: 310, session: 'notes' }];
		expect(seatNameForShellPid(300, SEATS, TMUX_PS, stray)).toBeUndefined();
	});

	test('names nothing for a shell with no tmux client under it', () => {
		expect(seatNameForShellPid(100, SEATS, TMUX_PS, TMUX_CLIENTS)).toBeUndefined();
	});
});
