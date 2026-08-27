/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * How this extension reaches the harness, decided once for every caller.
 *
 * WHY THIS FILE EXISTS. Four call sites — the agent, domain and project panels, and the revive
 * path behind the agent tree's right-click actions — each ran their command under `/bin/bash -lc`
 * and each carried a comment saying the login shell was what put `bun` on the PATH. It is not.
 * `~/.bash_profile` does source `~/.bashrc`, but `~/.bashrc` opens with the standard
 * non-interactive guard:
 *
 *     case $- in
 *         *i*) ;;
 *           *) return;;
 *     esac
 *
 * `bash -lc` is not interactive, so that returns before any PATH line runs. Measured on this
 * machine against the extension host's own environment, a login shell adds nothing at all: the
 * PATH comes back exactly as it went in. Every one of the four calls died with
 * `exec: bun: not found`, three panels drew empty, and the fourth reported the failure only when
 * Alan happened to click.
 *
 * WHY NO SHELL AT ALL NOW. The shell was there to supply a PATH it never supplied, so removing it
 * costs nothing and takes a process off every call. It also retires the care the old sites had to
 * take passing arguments positionally through `exec "$0" "$@"` so a seat name or a prompt body
 * could not be read as shell syntax — with no shell in the call there is no syntax to be read as.
 *
 * WHY PATH AND NOT AN INTERPRETER PATH. Resolving `bun` absolutely would fix the agent panel,
 * which invokes it directly, and leave the other three broken: they run `ops`, and `ops` itself
 * ends in `exec bun "$dispatcher" "$@"`, resolving `bun` from the PATH of whatever launched it.
 * The environment is the thing all four have in common, so the environment is what this sets.
 *
 * WHAT THIS DELIBERATELY DOES NOT DO. It does not load `~/.secrets.env`. `DATABASE_URL` is the
 * other thing the old comments credited to the login shell, and the agent panel genuinely needs
 * it — but it is already in the extension host's environment, inherited from the session Alan
 * launched the editor from, and was there throughout the outage this fixes. Sourcing a secrets
 * file here would be a second source for a value that already arrives, and would go stale against
 * it. Where it is ever missing, the verb says so plainly and the panel now shows that reason.
 */

import { execFile } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

/** The instructions checkout `INSTRUCTIONS_ROOT` names, or the one under `~/repos`. */
export function instructionsRoot(): string {
	const stated = process.env.INSTRUCTIONS_ROOT;
	return stated === undefined || stated === ''
		? path.join(os.homedir(), 'repos', 'instructions')
		: stated;
}

/**
 * The memory checkout `MEMORY_ROOT` names, or the one beside the instructions checkout.
 *
 * THE SAME TWO STEPS THE HARNESS TAKES. `tools/lib/roots.ts` reads `MEMORY_ROOT` and otherwise
 * resolves `memory` as a sibling of the instructions repository, and this repeats that pair rather
 * than naming a directory of its own. A checkout moved by the environment variable moves for the
 * editor on the same line it moves for the verbs, and a second rule here would let a watcher and
 * the command it triggers read two different trees.
 *
 * ANSWERED THROUGH `instructionsRoot` rather than through `os.homedir` directly, so the sibling is
 * taken from wherever `INSTRUCTIONS_ROOT` puts the harness rather than from `~/repos` regardless.
 */
export function memoryRoot(): string {
	const stated = process.env.MEMORY_ROOT;
	return stated === undefined || stated === ''
		? path.join(instructionsRoot(), '..', 'memory')
		: stated;
}

/**
 * The akasha checkout `AKASHA_ROOT` names, or the one beside the instructions checkout.
 *
 * THE SAME TWO STEPS AS `memoryRoot`, against the repository that holds seat pages. Seats moved
 * out of memory into `akasha:agent/seat`, and a watcher left pointed at the old directory goes
 * quiet rather than failing, so the tab names simply stop arriving with nothing to read.
 */
export function akashaRoot(): string {
	const stated = process.env.AKASHA_ROOT;
	return stated === undefined || stated === ''
		? path.join(instructionsRoot(), '..', 'akasha')
		: stated;
}

/**
 * `ops` by absolute path. It is not on the extension host's PATH either, and the panels that
 * already resolved it this way were right to — they were simply one step short, because resolving
 * the wrapper does nothing about the `bun` the wrapper goes on to exec.
 *
 * IN THE INSTRUCTIONS CHECKOUT, WHICH IS WHERE THE WRAPPER IS. This resolved against `CODE_ROOT`
 * and `packages/shared/dotfiles/bin/ops` until that directory left the code repository; nothing
 * under `packages/shared/` is a dotfiles tree now, and the wrapper stands at
 * `dotfiles/bin/ops` in the instructions repository. `execFile` on the path that no longer exists
 * fails with ENOENT before any verb runs, so every caller of `runOps` — the Domains panel and the
 * Work panel — drew nothing, while the Agents panel went on working because it reaches `bun`
 * through `runVerb` and never touches this path.
 *
 * THE SAME ROOT THE VERBS ARE TAKEN AGAINST. `verbPath` already resolves the instructions checkout,
 * and a second rule for where `ops` lives would let the wrapper and the verbs it dispatches to come
 * from two different trees.
 */
export const OPS_PATH = path.join(instructionsRoot(), 'dotfiles/bin/ops');

/** A verb's file under `tools/`, in the tree `INSTRUCTIONS_ROOT` names, or the one under `~/repos`. */
export function verbPath(verb: string): string {
	return path.join(instructionsRoot(), 'tools', `${verb}.ts`);
}

/**
 * The turn-colour verb's file.
 *
 * SPELLED ONCE, HERE, so the two surfaces that ask it — the tab strip and the subagent rows —
 * name one file. A checkout not holding it is a checkout this cannot reach, which the caller
 * reports in the place on screen it already reports an unreachable harness, naming the path it
 * looked for.
 */
export function turnColoursVerbPath(): string {
	return verbPath('agent-turn-colors');
}

/** Where `bun` is installed for this user. A list so a second location is a line, not a rewrite. */
const BUN_DIRECTORIES = [path.join(os.homedir(), '.bun', 'bin')];

/**
 * A call that could not be made at all, as against one that was made and failed.
 *
 * Separate because the two want different words on screen: this one means the editor cannot reach
 * the harness from where it is running, which is never something Alan did.
 */
export class HarnessUnreachableError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'HarnessUnreachableError';
	}
}

/** The directory holding `bun`, or a throw naming every place that was looked in. */
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

/**
 * The environment a harness call runs in: this process's own, with `bun` put on the PATH.
 *
 * PREPENDED RATHER THAN REPLACED, so a caller that already has a `bun` — a test, or a terminal
 * where the shell did run its PATH lines — keeps everything else it was given.
 */
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

/** What the command printed on stdout, or a throw carrying why it could not be read. */
async function run(file: string, args: readonly string[], options: HarnessCallOptions): Promise<string> {
	const { stdout } = await execFileP(file, [...args], {
		env: harnessEnvironment(),
		timeout: options.timeout,
		maxBuffer: options.maxBuffer,
	});
	return stdout;
}

/** Runs `ops` with the given arguments and answers its stdout. */
export async function runOps(args: readonly string[], options: HarnessCallOptions): Promise<string> {
	return run(OPS_PATH, args, options);
}

/**
 * A repository path a verb named, spelled the way the workbench spells it.
 *
 * WHY THIS IS NEEDED AT ALL, MEASURED RATHER THAN GUESSED AT. `/home` on this machine is a symlink
 * to `var/home`, and `$HOME` is `/home/walton`. The two verbs the panels call resolve their roots
 * differently and both are right: `ops instructions champions --tree --json` answers
 * `/var/home/walton/repos/instructions`, resolved from where the repository actually is, while
 * `ops memory work-tree --json` answers `/home/walton/repos/memory`, built from `$HOME`. They are one
 * directory under two spellings.
 *
 * WHAT THE SECOND SPELLING COSTS. The workspace holds these repositories as `/var/home/walton/...`,
 * so a watcher asked for `/home/walton/repos/memory` is asked for a path the workbench cannot see as one
 * it already watches, and stands up a second recursive watch over the same files. Resolving here
 * means a watcher lands on the folder the workspace already holds.
 *
 * A PATH THAT CANNOT BE RESOLVED IS ANSWERED UNCHANGED. This is a spelling correction and never a
 * check: a repository that has moved out from under a verb is that verb's business to report, and
 * a throw here would turn it into a panel that draws nothing.
 */
export function repositoryPath(repo: string): string {
	try {
		return fs.realpathSync(repo);
	} catch {
		return repo;
	}
}

/** Runs a `tools/` verb file under `bun` and answers its stdout. */
export async function runVerb(
	verbFile: string,
	args: readonly string[],
	options: HarnessCallOptions
): Promise<string> {
	return run(path.join(bunDirectory(), 'bun'), [verbFile, ...args], options);
}

/**
 * One line saying a panel could not reach the harness, for the place on screen Alan is looking.
 *
 * WHY THE PANELS NEED THIS AT ALL. Each of the three keeps its last good tree when a read fails,
 * which is right — blanking it would turn a transient failure into the claim that there are no
 * agents, or no domains. But on the first read after a restart there is no last good tree, so
 * what stays on screen is nothing, and an empty panel is exactly what a healthy empty answer
 * looks like. That is the reading Alan took on 2026-08-13. This is the sentence that tells the
 * two apart without opening an output channel.
 */
export function unreachableMessage(error: unknown): string {
	const detail = error instanceof Error ? error.message : String(error);
	return `Cannot reach the harness: ${detail.trim()}`;
}
