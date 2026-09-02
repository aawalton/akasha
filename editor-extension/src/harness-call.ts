import { execFile } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { promisify } from 'node:util';
import { isServed } from '../../tools/lib/verb-served.ts';
import { askServed, VerbServerClient } from './verb-server-client.ts';

const execFileP = promisify(execFile);

export function akashaRoot(): string {
	const stated = process.env.AKASHA_ROOT;
	return stated === undefined || stated === ''
		? path.join(os.homedir(), 'repos', 'akasha')
		: stated;
}

export function opsPath(): string {
	return path.join(akashaRoot(), 'dotfiles', 'bin', 'ops');
}

export function verbPath(verb: string): string {
	return path.join(akashaRoot(), 'tools', `${verb}.ts`);
}

const BUN_DIRECTORIES = [path.join(os.homedir(), '.bun', 'bin')];

export class HarnessUnreachableError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'HarnessUnreachableError';
	}
}

function bunDirectory(): string {
	for (const directory of BUN_DIRECTORIES) {
		if (fs.existsSync(path.join(directory, 'bun'))) {
			return directory;
		}
	}
	throw new HarnessUnreachableError(
		`bun is not installed in any of ${BUN_DIRECTORIES.join(', ')}, and every harness call needs it`
	);
}

export function harnessEnvironment(): NodeJS.ProcessEnv {
	const inherited = process.env.PATH ?? '';
	const bun = bunDirectory();
	return {
		...process.env,
		PATH: inherited === '' ? bun : `${bun}${path.delimiter}${inherited}`,
	};
}

export interface HarnessCallOptions {
	readonly timeout: number;
	readonly maxBuffer: number;
}

async function run(file: string, args: readonly string[], options: HarnessCallOptions): Promise<string> {
	const { stdout } = await execFileP(file, [...args], {
		env: harnessEnvironment(),
		timeout: options.timeout,
		maxBuffer: options.maxBuffer,
	});
	return stdout;
}

export async function runOps(args: readonly string[], options: HarnessCallOptions): Promise<string> {
	return run(opsPath(), args, options);
}

export function repositoryPath(repo: string): string {
	try {
		return fs.realpathSync(repo);
	} catch {
		return repo;
	}
}

const SERVER_VERB = 'verb-server';

// How long a server may take to say hello. It is a bun startup and nothing else — the verbs
// themselves are loaded when they are first asked for — so this is generous rather than tuned.
const SERVER_START_TIMEOUT_MS = 15_000;

let served: VerbServerClient | undefined;

let noise: ((text: string) => void) | undefined;

// Where the server's stray output and its own complaints go. Nothing said here is ever an answer:
// answers come back on a pipe of their own. Left unset, it is dropped.
export function verbServerHeard(say: (text: string) => void): undefined {
	noise = say;
	return undefined;
}

function servedClient(): VerbServerClient {
	if (served === undefined) {
		served = new VerbServerClient({
			bun: path.join(bunDirectory(), 'bun'),
			serverFile: verbPath(SERVER_VERB),
			env: harnessEnvironment(),
			startTimeoutMs: SERVER_START_TIMEOUT_MS,
			onNoise: (text) => noise?.(text),
		});
	}
	return served;
}

export function disposeVerbServer(): undefined {
	served?.dispose();
	served = undefined;
	return undefined;
}

export function verbNamed(verbFile: string): string {
	return path.basename(verbFile).replace(/\.ts$/, '');
}

// ASKED OF THE SERVER WHERE THERE IS ONE, AND OF NOTHING ELSE WHERE THERE IS NOT. A verb the
// server answers is never also spawned as a child on a bad day: a second road that quietly works
// and costs a fifth of a core is how the cost this removed would come back unseen. A server that
// cannot answer refuses, which the callers already draw as `unread` and log.
export async function runVerb(
	verbFile: string,
	args: readonly string[],
	options: HarnessCallOptions
): Promise<string> {
	const verb = verbNamed(verbFile);
	if (isServed(verb) && verbFile === verbPath(verb)) {
		const answer = await askServed(servedClient(), verb, args, options.timeout);
		if (answer.code !== 0) {
			throw new Error(`${verb} exited ${answer.code}: ${answer.stderr.trim()}`);
		}
		return answer.stdout;
	}
	return run(path.join(bunDirectory(), 'bun'), [verbFile, ...args], options);
}

export function unreachableMessage(error: unknown): string {
	const detail = error instanceof Error ? error.message : String(error);
	return `Cannot reach the harness: ${detail.trim()}`;
}
