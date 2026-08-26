/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * @fileoverview The bounded pid read, and the rule that keeps it the only one.
 *
 * TWO HALVES, CATCHING DIFFERENT THINGS. The behavioural half holds this module
 * to what it promises. The static half is the one that matters for the next
 * change: it fails when `.processId` is awaited anywhere else in `src/`, and it
 * is the only thing here that can reach a site written inside an `activate.ts`,
 * which imports `vscode` and so cannot be exercised under bun at all.
 *
 * Why that is worth a source-scanning test rather than review. Three call sites
 * reached this API and two of them were written with no bound; the one that was
 * bounded was bounded only because it broke first. There is no branch, no CI and
 * no review gate in front of this checkout — `build/opsExtensionTests.ts` runs
 * this suite from the pre-commit hook whenever anything under `extensions/ops/`
 * is staged, so this is where a fourth site gets met, by whoever writes it, as
 * they write it.
 */

import { describe, expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import {
	describeTerminal,
	type HasIdentity,
	type HasProcessId,
	identified,
	readProcessIds,
	tally,
	tallyLine,
} from './terminal-pids';

/** A terminal that answers with a pid. */
const answering = (pid: number | undefined): HasProcessId => ({
	processId: Promise.resolve(pid),
});

/** A terminal whose pty the host could not find again: its promise never settles. */
const silent = (): HasProcessId => ({ processId: new Promise<never>(() => { }) });

/** A terminal whose promise rejects. */
const failing = (): HasProcessId => ({
	processId: Promise.reject(new Error('gone')),
});

describe('readProcessIds', () => {
	test('reads every terminal that answers, in order', async () => {
		const terminals = [answering(11), answering(22), answering(33)];
		const readings = await readProcessIds(terminals, 1000);
		expect(readings.map((r) => r.outcome)).toEqual(['read', 'read', 'read']);
		expect(readings.map((r) => r.pid)).toEqual([11, 22, 33]);
		// Aligned with the input, so a caller can carry the terminal through.
		expect(readings.map((r) => r.terminal)).toEqual(terminals);
	});

	test('keeps "has no process" apart from "never answered"', async () => {
		// One is a fact about the terminal and the other a fact about the wait.
		// The rename feature logs one and stays silent on the other.
		const readings = await readProcessIds([answering(undefined), silent()], 20);
		expect(readings.map((r) => r.outcome)).toEqual(['no process', 'never answered']);
	});

	test('a terminal that never answers does not hold the sweep', async () => {
		const began = Date.now();
		const readings = await readProcessIds([silent()], 20);
		expect(readings[0]?.outcome).toBe('never answered');
		expect(Date.now() - began).toBeLessThan(2000);
	});

	test('a terminal that never answers does not cost the ones that do', async () => {
		// The case Alan met: seven dead terminals and a live one. Losing the live
		// one's pid would be the same panel, so the healthy reads have to survive
		// the dead ones rather than being bounded alongside them.
		const readings = await readProcessIds(
			[silent(), silent(), answering(99), silent()],
			20
		);
		expect(readings.map((r) => r.outcome)).toEqual([
			'never answered',
			'never answered',
			'read',
			'never answered',
		]);
		expect(identified(readings).map((r) => r.pid)).toEqual([99]);
	});

	test('the bound is paid once over the whole sweep, not once per terminal', async () => {
		// THIS IS THE ONE THAT MATTERS FOR THE PANEL. Bounding each terminal
		// separately and awaiting them in turn would make these eight dead
		// terminals cost eight bounds — at the real five seconds, forty seconds of
		// a panel that still looks stuck. Eight times the bound is the failure
		// this asserts against, so the ceiling is set well under it.
		const bound = 50;
		const dead = Array.from({ length: 8 }, silent);
		const began = Date.now();
		const readings = await readProcessIds(dead, bound);
		const elapsed = Date.now() - began;
		expect(readings).toHaveLength(8);
		expect(elapsed).toBeLessThan(bound * 4);
	});

	test('a rejecting terminal is passed over rather than taking the sweep down', async () => {
		const readings = await readProcessIds([failing(), answering(7)], 1000);
		expect(readings[0]?.outcome).toBe('never answered');
		expect(identified(readings).map((r) => r.pid)).toEqual([7]);
	});

	test('a rejection landing after the bound is not left unhandled', async () => {
		let reject: (err: unknown) => void = () => { };
		const late: HasProcessId = {
			processId: new Promise<number>((_, r) => { reject = r; }),
		};
		expect((await readProcessIds([late], 20))[0]?.outcome).toBe('never answered');
		reject(new Error('too late'));
		// An unhandled rejection would take the process down rather than fail here,
		// so surviving the turn of the loop is the assertion.
		await new Promise((r) => setTimeout(r, 20));
		expect(true).toBe(true);
	});

	test('no terminals answers at once rather than waiting out the bound', async () => {
		const began = Date.now();
		expect(await readProcessIds([], 10_000)).toEqual([]);
		expect(Date.now() - began).toBeLessThan(1000);
	});
});

describe('identified', () => {
	test('drops every terminal that could not say what it is running', async () => {
		// The precedent from 551a63a: a terminal that cannot say is passed over,
		// never guessed at. Nothing downstream should be able to see a reading
		// without a pid and treat it as one.
		const readings = await readProcessIds(
			[answering(5), answering(undefined), silent(), failing()],
			20
		);
		expect(identified(readings).map((r) => r.pid)).toEqual([5]);
	});
});

describe('tally', () => {
	test('keeps the three outcomes apart, which is the whole point of counting', async () => {
		// `identified` drops the last three into one silence. This is the reading
		// that tells them apart, and the reason it exists: a panel reporting only
		// what it found cannot say whether the rest were cheap or cost the bound.
		const readings = await readProcessIds(
			[answering(5), answering(7), answering(undefined), silent(), failing()],
			20
		);
		expect(tally(readings)).toEqual({
			swept: 5,
			read: 2,
			noProcess: 1,
			// A rejection is an answer of `never answered`, so `failing` lands here
			// beside `silent` rather than in a fourth bucket.
			neverAnswered: 2,
		});
	});

	test('an empty sweep counts nothing rather than refusing to count', async () => {
		expect(tally(await readProcessIds([], 20))).toEqual({
			swept: 0,
			read: 0,
			noProcess: 0,
			neverAnswered: 0,
		});
	});
});

describe('tallyLine', () => {
	test('says nothing about outcomes that did not happen', () => {
		// A healthy window is the common case and must not print two zeroes that a
		// reader then has to learn to ignore. What is absent is what is fine.
		expect(tallyLine({ swept: 7, read: 7, noProcess: 0, neverAnswered: 0 }, 12)).toBe(
			'7 terminal(s) swept in 12ms: 7 read'
		);
	});

	test('shouts the one outcome that costs the bound', () => {
		// UPPERCASE ON PURPOSE. This is the line that was missing on 2026-08-13,
		// and the reader it has to reach is scanning a log for why a panel is slow.
		expect(tallyLine({ swept: 9, read: 6, noProcess: 1, neverAnswered: 2 }, 5001)).toBe(
			'9 terminal(s) swept in 5001ms: 6 read, 1 with no process, 2 NEVER ANSWERED'
		);
	});
});

describe('describeTerminal', () => {
	/** A terminal carrying only what the API gives for one nobody configured. */
	const bare = (over: Partial<HasIdentity> = {}): HasIdentity => ({
		name: 'bash',
		creationOptions: {},
		...over,
	});

	test('names the terminal by its position when its name cannot', () => {
		// THE WHOLE POINT. Seventeen terminals called "bash" and one of them silent:
		// the position is what tells the reader which line is about which tab.
		expect(describeTerminal(bare(), 6, 17)).toBe(
			'#7/17 name="bash" shellPath=unset cwd=unset hideFromUser=false location=unset running'
		);
	});

	test('carries the launch config a revived terminal was rebuilt from', () => {
		// A terminal revived from a saved config has these; one Alan opened himself
		// has neither. That is the split this line exists to let a reader make.
		expect(
			describeTerminal(
				bare({ creationOptions: { shellPath: '/usr/bin/bash', cwd: '/home/walton' } }),
				0,
				3
			)
		).toBe(
			'#1/3 name="bash" shellPath="/usr/bin/bash" cwd="/home/walton" ' +
			'hideFromUser=false location=unset running'
		);
	});

	test('reads a cwd given as a Uri, which is the shape the API actually hands over', () => {
		expect(describeTerminal(bare({ creationOptions: { cwd: { path: '/tmp/x' } } }), 0, 1)).toContain(
			'cwd="/tmp/x"'
		);
	});

	test('marks a terminal that was never put in front of Alan', () => {
		// A hidden terminal is a live candidate for one that is never revealed and so
		// never gets a process, and nothing else in the line would show it.
		expect(describeTerminal(bare({ creationOptions: { hideFromUser: true } }), 0, 1)).toContain(
			'hideFromUser=true'
		);
	});

	test('separates an editor terminal from a panel one, in both shapes', () => {
		expect(describeTerminal(bare({ creationOptions: { location: 2 } }), 0, 1)).toContain(
			'location=editor'
		);
		expect(describeTerminal(bare({ creationOptions: { location: 1 } }), 0, 1)).toContain(
			'location=panel'
		);
		expect(
			describeTerminal(bare({ creationOptions: { location: { viewColumn: 3 } } }), 0, 1)
		).toContain('location=editor');
	});

	test('separates a dead terminal still listed from a live one', () => {
		// These read identically in every log taken so far, and they are not the same
		// fault: one never answered, the other has nothing left to answer with.
		expect(describeTerminal(bare({ exitStatus: { code: 130 } }), 0, 1)).toContain(
			'exited(code=130)'
		);
		expect(describeTerminal(bare({ exitStatus: { code: undefined } }), 0, 1)).toContain(
			'exited(code=none)'
		);
	});
});

/** Every `.ts` file under `src/`, relative to it. */
async function sourceFiles(srcDir: string): Promise<readonly string[]> {
	const found: string[] = [];
	const walk = async (dir: string): Promise<void> => {
		for (const entry of await readdir(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) { await walk(full); continue; }
			if (entry.name.endsWith('.ts')) { found.push(path.relative(srcDir, full)); }
		}
	};
	await walk(srcDir);
	return found.sort();
}

/**
 * The body with its comments taken out.
 *
 * Comments are stripped rather than matched around because the reasoning for
 * this rule names `Terminal.processId` in prose in several files, and a check
 * that flagged its own explanation would be turned off within the week.
 */
function withoutComments(body: string): string {
	return body.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

describe('the bounded read is the only one', () => {
	const srcDir = path.join(import.meta.dirname, '..');
	/** The one module allowed to await the workbench's pid promise. */
	const CHOKEPOINT = path.join('seat', 'terminal-pids.ts');

	test('the chokepoint is where this check thinks it is', async () => {
		// Named rather than assumed. If the module is renamed or moved, the scan
		// below would find nothing and pass for the wrong reason — a zero looks
		// the same whether nothing is there or the path is wrong.
		const body = await readFile(path.join(srcDir, CHOKEPOINT), 'utf8');
		expect(withoutComments(body)).toContain('processId');
	});

	test('no other file in src/ touches Terminal.processId', async () => {
		const offenders: string[] = [];
		for (const rel of await sourceFiles(srcDir)) {
			if (rel === CHOKEPOINT) { continue; }
			// Tests are exempt because there is no workbench under bun: a `processId`
			// in a test file is a fake being built, which is the opposite of the
			// fault. The rule is about what ships in the extension host.
			if (rel.endsWith('.test.ts')) { continue; }
			const body = withoutComments(await readFile(path.join(srcDir, rel), 'utf8'));
			for (const [index, line] of body.split('\n').entries()) {
				if (/\bprocessId\b/.test(line)) { offenders.push(`${rel}:${index + 1}: ${line.trim()}`); }
			}
		}

		// The message is the whole point of this test: it has to say what to do
		// instead, to whoever has just written the fourth one.
		expect(
			offenders,
			[
				'',
				'`Terminal.processId` is a promise the workbench builds in its own',
				'constructor and settles only where the terminal has a live process. A',
				'terminal whose pty the host could not find again never settles it: no',
				'rejection, no timeout, nothing that ever gives up. Awaiting it directly is',
				'what left Alan\'s Agents panel on "Reading the fleet…" for a whole session.',
				'',
				`Read it through \`readProcessIds\` in \`${CHOKEPOINT}\` instead. That bounds the`,
				'wait once for the whole sweep, and `identified` drops the terminals that',
				'could not say what they are running rather than guessing at them.',
				'',
				'Awaited outside the chokepoint here:',
				...offenders.map((o) => `  ${o}`),
				'',
			].join('\n')
		).toEqual([]);
	});
});
