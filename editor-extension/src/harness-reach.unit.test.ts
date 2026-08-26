/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Every way this extension reaches the harness, run with no `bun` on the ambient PATH.
 *
 * WHAT THIS CATCHES AND NOTHING ELSE DID. On 2026-08-13 three panels drew empty in the editor Alan
 * runs, because every call out of the extension host went through `/bin/bash -lc` on the belief
 * that a login shell put `bun` on the PATH. It does not — `~/.bashrc` returns at its
 * non-interactive guard before any PATH line runs. The browser gate drove a real workbench, passed
 * eight of eight and reported no view failing to render, because the views DID render; they were
 * simply fed nothing. The unit tests passed because they parse answers that were handed to them.
 * Nothing anywhere ran the calls themselves.
 *
 * WHY SCRUBBING THE PATH IS THE WHOLE TRICK. The fault is invisible from any seat, because a seat's
 * own shell has `bun` and a child inherits it. That is what let this be verified as working four
 * times over. These tests take `bun` back off the PATH, which is the one thing that makes a
 * developer's machine resemble the extension host, and then make the real calls.
 *
 * THEY SPAWN REAL PROCESSES AND READ THE REAL REPOSITORIES. That is deliberate: a test that stubbed
 * the spawn would be testing the stub, and the fault under test lives entirely in how the process
 * is spawned. They need no editor, which is what the project asked for.
 */

import { afterEach, describe, expect, test } from 'bun:test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { askHarness } from './features/agent-tree/harness';
import { readDomainTree } from './features/domain-tree/harness';
import { readWorkTree } from './features/work-tree/harness';
import { repositoryPath } from './harness-call';

/** Long enough for a verb that scans a whole repository, and short enough to fail rather than hang. */
const CALL_TIMEOUT_MS = 90_000;

const REAL_PATH = process.env.PATH;

/**
 * The PATH with every directory holding a `bun` off it.
 *
 * BY WHAT IS THERE rather than by name: the point is that no child can resolve `bun` from what it
 * inherits, and a directory is only innocent if it does not contain one.
 */
function pathWithoutBun(): string {
	const entries = (REAL_PATH ?? '').split(path.delimiter).filter((entry) => entry !== '');
	return entries
		.filter((entry) => !fs.existsSync(path.join(entry, 'bun')))
		.join(path.delimiter);
}

afterEach(() => {
	// Restored rather than left, because the runner's own later work resolves tools off this.
	process.env.PATH = REAL_PATH;
});

describe('reaching the harness with no bun on the ambient PATH', () => {
	test('the scrub actually removes bun, or these tests prove nothing', () => {
		const scrubbed = pathWithoutBun().split(path.delimiter).filter((entry) => entry !== '');
		const survivors = scrubbed.filter((entry) => fs.existsSync(path.join(entry, 'bun')));
		expect(survivors).toEqual([]);
	});

	test('the Domains panel reads its tree', async () => {
		process.env.PATH = pathWithoutBun();
		const tree = await readDomainTree();
		// A domain corpus with no roots would be a real answer, so the assertion is on the shape
		// having been read at all AND on it carrying something. Empty here is the failure this
		// exists to catch, wearing its success face.
		expect(tree.roots.length).toBeGreaterThan(0);
	}, CALL_TIMEOUT_MS);

	test('the Work panel reads its tree', async () => {
		process.env.PATH = pathWithoutBun();
		const tree = await readWorkTree();
		expect(tree.roots.length).toBeGreaterThan(0);
	}, CALL_TIMEOUT_MS);

	test('the Agents panel reaches its verb', async () => {
		process.env.PATH = pathWithoutBun();
		// ASSERTED DIFFERENTLY FROM THE OTHER TWO, because this verb reads the database and the
		// other two read files. A machine with no `DATABASE_URL` should not fail this test — that
		// is a real condition the panel now states on screen, not the fault under test. What is
		// asserted is that the call REACHED the verb: an interpreter that could not be resolved
		// never gets that far, and says so in these words.
		let failure = '';
		try {
			await askHarness('agent-forest');
		} catch (err) {
			failure = String(err);
		}
		expect(failure).not.toContain('bun: not found');
		expect(failure).not.toContain('ENOENT');
	}, CALL_TIMEOUT_MS);
});

/**
 * The repository each panel watches, held against the one its verb named.
 *
 * WHAT THIS CATCHES. The two verbs resolve their roots differently and both are right: the domain
 * one answers a path resolved from where the repository actually is, and the project one answers a
 * path built from `$HOME`. On a machine where `/home` is a symlink — which this one is — those are
 * one directory under two spellings, and only one of them is the spelling the workspace holds. A
 * watcher asked for the other still works and still costs a second recursive watch over files the
 * workbench is already watching, which is invisible from every panel and from every reading of the
 * tree it draws.
 *
 * ASSERTED AGAINST THE REAL VERBS, because the divergence is between two commands in another
 * repository. A fixture would assert what this file believed on the day it was written.
 */
describe('the repository a panel watches', () => {
	test('the Domains panel watches a canonical path naming the repository the command named', async () => {
		const tree = await readDomainTree();
		const watched = repositoryPath(tree.repo);
		expect(fs.realpathSync(watched)).toBe(watched);
		expect(fs.realpathSync(tree.repo)).toBe(watched);
	}, CALL_TIMEOUT_MS);

	test('the Work panel watches a canonical path naming the repository the command named', async () => {
		const tree = await readWorkTree();
		const watched = repositoryPath(tree.repo);
		expect(fs.realpathSync(watched)).toBe(watched);
		expect(fs.realpathSync(tree.repo)).toBe(watched);
	}, CALL_TIMEOUT_MS);

	test('a repository that is not there is answered unchanged rather than thrown over', () => {
		// The fallback, which is what keeps a moved repository a message from the verb rather than a
		// panel that draws nothing.
		const absent = path.join('/var/tmp', 'no-such-repository-19011');
		expect(repositoryPath(absent)).toBe(absent);
	});
});
