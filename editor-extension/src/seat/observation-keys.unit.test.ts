/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @fileoverview That a feature files its observations under the name it is looked up by.
 *
 * WHY THIS IS WORTH A CHECK. The record is a map keyed by feature name, and a
 * verifier reaches an observation by spelling that name — `agent-tree`, the
 * directory it lives in, the name `extension.ts` starts it under. Nothing joins
 * those three: a feature recording under `agentTree`, or a directory renamed
 * without its `FEATURE` const following, files perfectly good observations under
 * a key nobody asks for. What a verifier then meets is a feature that activated
 * and appears to have observed nothing, which is a wrong answer rather than a
 * missing one — and the whole record exists to stop exactly that.
 *
 * Source text rather than behaviour, for the reason `terminal-pids.unit.test.ts`
 * reads source text: the constants live in `activate.ts` files that import
 * `vscode`, and this suite runs under bun with no workbench.
 */
import { describe, expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import * as path from 'node:path';

const SRC = path.join(import.meta.dirname, '..');
const FEATURES_DIR = path.join(SRC, 'features');

/** `const FEATURE = '…';` as each feature declares it. */
const FEATURE_CONST_RE = /^const FEATURE = '([^']+)';$/m;

async function featureDirs(): Promise<readonly string[]> {
	const entries = await readdir(FEATURES_DIR, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

describe('a feature is one name in three places', () => {
	test('there are features to check, so a pass is not an empty scan', async () => {
		// A zero looks the same whether nothing is wrong or the directory moved.
		expect((await featureDirs()).length).toBeGreaterThan(5);
	});

	test('every feature that records does so under its own directory name', async () => {
		const wrong: string[] = [];
		for (const dir of await featureDirs()) {
			const body = await readFile(path.join(FEATURES_DIR, dir, 'activate.ts'), 'utf8');
			const declared = FEATURE_CONST_RE.exec(body)?.[1];
			// A feature that records nothing declares nothing, which is allowed: not
			// every feature has something worth observing. `transcript` opens a panel
			// when Alan clicks, and there is no count in that.
			if (declared === undefined) {
				if (/record(Observation|Sweep)\(/.test(body)) {
					wrong.push(`${dir}: records observations without declaring FEATURE`);
				}
				continue;
			}
			if (declared !== dir) { wrong.push(`${dir}: records under '${declared}'`); }
		}

		expect(
			wrong,
			[
				'',
				'A feature files its observations under a key a verifier spells by hand,',
				'and the name they will spell is the feature\'s directory — the same name',
				'`extension.ts` starts it under and records its activation under.',
				'',
				'A key that does not match reads, from outside, as a feature that',
				'activated and observed nothing. That is the silent wrong answer this',
				'record was built to remove, so it is checked rather than remembered.',
				'',
				'Out of step here:',
				...wrong.map((w) => `  ${w}`),
				'',
			].join('\n')
		).toEqual([]);
	});

	test('every name `extension.ts` starts a feature under is a feature directory', async () => {
		const body = await readFile(path.join(SRC, 'extension.ts'), 'utf8');
		const started = [...body.matchAll(/\{ name: '([^']+)', start:/g)].map((m) => m[1]).sort();
		const dirs = await featureDirs();
		// The activation outcomes are recorded under these names, so a name here that
		// is not a directory would put a feature's activation under one key and its
		// observations under another. A directory this list leaves out is a feature
		// switched off, which joins no key to the wrong place, so it is not checked.
		expect(started.filter((name) => !dirs.includes(name))).toEqual([]);
	});
});
