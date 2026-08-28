import { afterEach, describe, expect, test } from 'bun:test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { askHarness } from './features/agent-tree/harness.ts';
import { readDomainTree } from './features/domain-tree/harness.ts';
import { readWorkTree } from './features/work-tree/harness.ts';
import { repositoryPath } from './harness-call.ts';

const CALL_TIMEOUT_MS = 90_000;

const REAL_PATH = process.env.PATH;

function pathWithoutBun(): string {
	const entries = (REAL_PATH ?? '').split(path.delimiter).filter((entry) => entry !== '');
	return entries
		.filter((entry) => !fs.existsSync(path.join(entry, 'bun')))
		.join(path.delimiter);
}

afterEach(() => {
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
		expect(tree.roots.length).toBeGreaterThan(0);
	}, CALL_TIMEOUT_MS);

	test('the Work panel reads its tree', async () => {
		process.env.PATH = pathWithoutBun();
		const tree = await readWorkTree();
		expect(tree.roots.length).toBeGreaterThan(0);
	}, CALL_TIMEOUT_MS);

	test('the Agents panel reaches its verb', async () => {
		process.env.PATH = pathWithoutBun();
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
		const absent = path.join('/var/tmp', 'no-such-repository-19011');
		expect(repositoryPath(absent)).toBe(absent);
	});
});
