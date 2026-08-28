import { describe, expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import * as path from 'node:path';

const SRC = path.join(import.meta.dirname, '..');
const FEATURES_DIR = path.join(SRC, 'features');

const FEATURE_CONST_RE = /^const FEATURE = '([^']+)';$/m;

async function featureDirs(): Promise<readonly string[]> {
	const entries = await readdir(FEATURES_DIR, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

describe('a feature is one name in three places', () => {
	test('there are features to check, so a pass is not an empty scan', async () => {
		expect((await featureDirs()).length).toBeGreaterThan(5);
	});

	test('every feature that records does so under its own directory name', async () => {
		const wrong: string[] = [];
		for (const dir of await featureDirs()) {
			const body = await readFile(path.join(FEATURES_DIR, dir, 'activate.ts'), 'utf8');
			const declared = FEATURE_CONST_RE.exec(body)?.[1];
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
		expect(started.filter((name) => !dirs.includes(name))).toEqual([]);
	});
});
