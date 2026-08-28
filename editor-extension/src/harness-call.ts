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

/**
 * The akasha checkout `AKASHA_ROOT` names, or the one under `~/repos`.
 *
 * THE ONLY ROOT THIS EXTENSION RESOLVES. `instructions` and `memory` were absorbed into akasha and
 * their checkouts are gone, so the two helpers that named them answered directories that are not
 * there, and this one reached akasha by stepping up out of the instructions tree to find it.
 *
 * BUILT FROM `os.homedir` rather than from a sibling, because there is no longer a second checkout
 * to be a sibling of.
 */
export function akashaRoot(): string {
	const stated = process.env.AKASHA_ROOT;
	return stated === undefined || stated === ''
		? path.join(os.homedir(), 'repos', 'akasha')
		: stated;
}

/**
 * `ops` by absolute path, in the akasha checkout. `ops` is not on the extension host's PATH.
 *
 * A FUNCTION RATHER THAN A CONSTANT. A constant is resolved once at import and cannot be resolved
 * again, so a wrapper that moved would stay wrong in a running editor until it was restarted —
 * and `execFile` on a path that has gone fails with ENOENT before any verb runs, which empties
 * the Domains and Work panels without saying why.
 */
export function opsPath(): string {
	return path.join(akashaRoot(), 'dotfiles', 'bin', 'ops');
}

/**
 * A verb's file under `tools/` in the akasha checkout.
 *
 * ONE CHECKOUT NOW. This looked in akasha and fell back to instructions while the tools tree was
 * moving between them. The instructions tree is gone, so the fallback could only ever build a path
 * into a missing directory and report the ENOENT against the wrong one.
 *
 * RESOLVED AT CALL TIME rather than held in a constant, so a build shipped before a verb is added
 * goes on finding it afterwards without being promoted again.
 */
export function verbPath(verb: string): string {
	return path.join(akashaRoot(), 'tools', `${verb}.ts`);
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
	return run(opsPath(), args, options);
}

/**
 * A repository path a verb named, spelled the way the workbench spells it.
 *
 * WHY THIS IS NEEDED AT ALL, MEASURED RATHER THAN GUESSED AT. `/home` on this machine is a symlink
 * to `var/home`, and `$HOME` is `/home/walton`. The verbs the panels call resolve their roots
 * differently and both ways are right: one resolved from where the repository actually is answers
 * `/var/home/walton/repos/akasha`, while one built from `$HOME` answers `/home/walton/repos/akasha`.
 * They are one directory under two spellings.
 *
 * WHAT THE SECOND SPELLING COSTS. The workspace holds this repository as `/var/home/walton/...`,
 * so a watcher asked for `/home/walton/repos/akasha` is asked for a path the workbench cannot see as
 * one it already watches, and stands up a second recursive watch over the same files. Resolving here
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
