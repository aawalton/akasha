import { execFile } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { promisify } from 'node:util';

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

export async function runVerb(
	verbFile: string,
	args: readonly string[],
	options: HarnessCallOptions
): Promise<string> {
	return run(path.join(bunDirectory(), 'bun'), [verbFile, ...args], options);
}

export function unreachableMessage(error: unknown): string {
	const detail = error instanceof Error ? error.message : String(error);
	return `Cannot reach the harness: ${detail.trim()}`;
}
