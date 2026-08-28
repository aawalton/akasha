import { describe, expect, test } from 'bun:test';
import {
	isWindowLive,
	parseProcessStart,
	readWindowIdentity,
	recordNameFor,
	sameWindow,
} from './window-identity.ts';

const REAL =
	'3280707 (openvscode-serv) S 2933262 2933262 2933262 0 -1 4194304 2020845 1825297 3 2 ' +
	'2787 655 953 1669 20 0 22 0 46800522 12345 678 90 0 0 0 0 0 0 0';

describe('reading a process start time', () => {
	test('field 22 out of a real stat line', () => {
		expect(parseProcessStart(REAL)).toBe(46800522);
	});

	test('a name holding spaces and brackets does not shift the fields', () => {
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
		const self = await readWindowIdentity(process.pid);
		expect(await isWindowLive({ pid: self.pid, startedAt: self.startedAt + 1 })).toBe(false);
	});

	test('a record written where /proc said nothing falls back to the pid', async () => {
		expect(await isWindowLive({ pid: process.pid, startedAt: 0 })).toBe(true);
		expect(await isWindowLive({ pid: 0, startedAt: 0 })).toBe(false);
	});
});
