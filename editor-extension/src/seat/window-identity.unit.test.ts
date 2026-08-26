/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview That a window can be told from another window, and from itself later.
 *
 * The parsing is exercised against text rather than against `/proc`, and the
 * liveness against this process and a pid that cannot be running. What cannot be
 * reached from here — that `vscode.env.sessionId` is a constant in a served
 * window — is why the identity does not come from it, and is recorded in
 * `./window-identity.ts` with the drive that established it.
 */
import { describe, expect, test } from 'bun:test';
import {
	isWindowLive,
	parseProcessStart,
	readWindowIdentity,
	recordNameFor,
	sameWindow,
} from './window-identity';

// A real line, taken from this fork's own extension host on 2026-08-13.
const REAL =
	'3280707 (openvscode-serv) S 2933262 2933262 2933262 0 -1 4194304 2020845 1825297 3 2 ' +
	'2787 655 953 1669 20 0 22 0 46800522 12345 678 90 0 0 0 0 0 0 0';

describe('reading a process start time', () => {
	test('field 22 out of a real stat line', () => {
		expect(parseProcessStart(REAL)).toBe(46800522);
	});

	test('a name holding spaces and brackets does not shift the fields', () => {
		// THE REASON THIS IS PARSED FROM THE LAST `)` RATHER THAN BY SPLITTING. The
		// second field is the executable name, it is not escaped, and counting from
		// the left goes wrong on exactly the processes whose names are least
		// predictable.
		const awkward = REAL.replace('(openvscode-serv)', '(Code Helper (Renderer))');
		expect(parseProcessStart(awkward)).toBe(46800522);
	});

	test('text that is not a stat line answers nothing rather than a number', () => {
		expect(parseProcessStart('')).toBeUndefined();
		expect(parseProcessStart('1234 no-brackets S 1 2 3')).toBeUndefined();
		expect(parseProcessStart('1234 (x) S 1 2 3')).toBeUndefined();
	});
});

describe('telling one window from another', () => {
	test('two hosts are two windows', () => {
		expect(sameWindow({ pid: 1001, startedAt: 5 }, { pid: 2002, startedAt: 5 })).toBe(false);
	});

	test('the same pid started again is not the same window', () => {
		// A reused pid is the way a record left behind by a killed window comes to
		// read as a live one.
		expect(sameWindow({ pid: 1001, startedAt: 5 }, { pid: 1001, startedAt: 9 })).toBe(false);
	});

	test('a window is itself', () => {
		expect(sameWindow({ pid: 1001, startedAt: 5 }, { pid: 1001, startedAt: 5 })).toBe(true);
	});

	test('nothing is not a window', () => {
		expect(sameWindow({ pid: 1001, startedAt: 5 }, undefined)).toBe(false);
	});

	test('the file name keeps two live windows apart', () => {
		expect(recordNameFor({ pid: 1001, startedAt: 5 })).toBe('1001.json');
		expect(recordNameFor({ pid: 2002, startedAt: 5 })).not.toBe(
			recordNameFor({ pid: 1001, startedAt: 5 })
		);
	});
});

describe('against the running system', () => {
	test('this process reads as live, with a start time', async () => {
		const self = await readWindowIdentity(process.pid);
		expect(self.pid).toBe(process.pid);
		expect(self.startedAt).toBeGreaterThan(0);
		expect(await isWindowLive(self)).toBe(true);
	});

	test('a pid that is not running reads as gone', async () => {
		expect(await isWindowLive({ pid: 0, startedAt: 1 })).toBe(false);
	});

	test('this pid with another start time reads as gone', async () => {
		// The pid answers; the run does not match. This is the reuse case, and the
		// pid-only check that shipped first would have called it live.
		const self = await readWindowIdentity(process.pid);
		expect(await isWindowLive({ pid: self.pid, startedAt: self.startedAt + 1 })).toBe(false);
	});

	test('a record written where /proc said nothing falls back to the pid', async () => {
		// Zero is "not known" rather than a reading, and degrades to the check these
		// records had before, which is weaker than this and not wrong.
		expect(await isWindowLive({ pid: process.pid, startedAt: 0 })).toBe(true);
		expect(await isWindowLive({ pid: 0, startedAt: 0 })).toBe(false);
	});
});
