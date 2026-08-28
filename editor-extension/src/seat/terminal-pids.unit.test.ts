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
} from './terminal-pids.ts';

const answering = (pid: number | undefined): HasProcessId => ({
	processId: Promise.resolve(pid),
});

const silent = (): HasProcessId => ({ processId: new Promise<never>(() => { }) });

const failing = (): HasProcessId => ({
	processId: Promise.reject(new Error('gone')),
});

describe('readProcessIds', () => {
	test('reads every terminal that answers, in order', async () => {
		const terminals = [answering(11), answering(22), answering(33)];
		const readings = await readProcessIds(terminals, 1000);
		expect(readings.map((r) => r.outcome)).toEqual(['read', 'read', 'read']);
		expect(readings.map((r) => r.pid)).toEqual([11, 22, 33]);
		expect(readings.map((r) => r.terminal)).toEqual(terminals);
	});

	test('keeps "has no process" apart from "never answered"', async () => {
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
		const readings = await readProcessIds(
			[answering(5), answering(undefined), silent(), failing()],
			20
		);
		expect(identified(readings).map((r) => r.pid)).toEqual([5]);
	});
});

describe('tally', () => {
	test('keeps the three outcomes apart, which is the whole point of counting', async () => {
		const readings = await readProcessIds(
			[answering(5), answering(7), answering(undefined), silent(), failing()],
			20
		);
		expect(tally(readings)).toEqual({
			swept: 5,
			read: 2,
			noProcess: 1,
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
		expect(tallyLine({ swept: 7, read: 7, noProcess: 0, neverAnswered: 0 }, 12)).toBe(
			'7 terminal(s) swept in 12ms: 7 read'
		);
	});

	test('shouts the one outcome that costs the bound', () => {
		expect(tallyLine({ swept: 9, read: 6, noProcess: 1, neverAnswered: 2 }, 5001)).toBe(
			'9 terminal(s) swept in 5001ms: 6 read, 1 with no process, 2 NEVER ANSWERED'
		);
	});
});

describe('describeTerminal', () => {
	const bare = (over: Partial<HasIdentity> = {}): HasIdentity => ({
		name: 'bash',
		creationOptions: {},
		...over,
	});

	test('names the terminal by its position when its name cannot', () => {
		expect(describeTerminal(bare(), 6, 17)).toBe(
			'#7/17 name="bash" shellPath=unset cwd=unset hideFromUser=false location=unset running'
		);
	});

	test('carries the launch config a revived terminal was rebuilt from', () => {
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
		expect(describeTerminal(bare({ exitStatus: { code: 130 } }), 0, 1)).toContain(
			'exited(code=130)'
		);
		expect(describeTerminal(bare({ exitStatus: { code: undefined } }), 0, 1)).toContain(
			'exited(code=none)'
		);
	});
});

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

function withoutComments(body: string): string {
	return body.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

describe('the bounded read is the only one', () => {
	const srcDir = path.join(import.meta.dirname, '..');
	const CHOKEPOINT = path.join('seat', 'terminal-pids.ts');

	test('the chokepoint is where this check thinks it is', async () => {
		const body = await readFile(path.join(srcDir, CHOKEPOINT), 'utf8');
		expect(withoutComments(body)).toContain('processId');
	});

	test('no other file in src/ touches Terminal.processId', async () => {
		const offenders: string[] = [];
		for (const rel of await sourceFiles(srcDir)) {
			if (rel === CHOKEPOINT) { continue; }
			if (rel.endsWith('.test.ts')) { continue; }
			const body = withoutComments(await readFile(path.join(srcDir, rel), 'utf8'));
			for (const [index, line] of body.split('\n').entries()) {
				if (/\bprocessId\b/.test(line)) { offenders.push(`${rel}:${index + 1}: ${line.trim()}`); }
			}
		}

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
