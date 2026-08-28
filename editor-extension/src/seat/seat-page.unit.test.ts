import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { agentIdsForSeatNames, frontmatterValue, seatNamesOnDisk } from './seat-page.ts';

let root: string;
let dirs: readonly string[];

const PAGE = (id: string) => `---\npage-type-slug: seat\nid: ${id}\ntitle: "x"\n---\n`;

beforeAll(async () => {
	root = await mkdtemp(path.join(os.tmpdir(), 'seat-page-'));
	const current = path.join(root, 'pages', 'seat');
	const legacy = path.join(root, 'seats');
	await mkdir(current, { recursive: true });
	await mkdir(legacy, { recursive: true });
	dirs = [current, legacy];
	await writeFile(path.join(current, 'dalla.seat.md'), PAGE('01a038e0-f5d0-7000-a371-096b7462ccb6'));
	await writeFile(path.join(current, 'astra.seat.md'), PAGE('01a038e5-0ae3-7000-87b3-eb6e833d34ef'));
	await writeFile(path.join(current, 'no-transcript.seat.md'), PAGE('01a034d8-08eb-7000-a5aa-7a855b0776d3'));
	await writeFile(path.join(current, 'no-id.seat.md'), '---\npage-type-slug: seat\ntitle: "x"\n---\n');
	await writeFile(path.join(current, 'not-a-page.txt'), 'x');
	await writeFile(path.join(legacy, 'left-behind.md'), PAGE('01a00000-0000-7000-8000-000000000001'));
	await writeFile(path.join(root, 'elsewhere.md'), PAGE('01a00000-0000-7000-8000-000000000002'));
});

afterAll(async () => {
	await rm(root, { recursive: true, force: true });
});

describe('agentIdsForSeatNames', () => {
	test('answers the agent id each seat page states', async () => {
		const found = await agentIdsForSeatNames(['dalla', 'astra'], dirs);
		expect(found.get('dalla')).toBe('01a038e0-f5d0-7000-a371-096b7462ccb6');
		expect(found.get('astra')).toBe('01a038e5-0ae3-7000-87b3-eb6e833d34ef');
	});

	test('leaves out a name no page stands for', async () => {
		const found = await agentIdsForSeatNames(['dalla', 'nobody'], dirs);
		expect(found.has('nobody')).toBe(false);
		expect(found.size).toBe(1);
	});

	test('reads both of the directories seat pages stand in', async () => {
		const found = await agentIdsForSeatNames(['left-behind'], dirs);
		expect(found.get('left-behind')).toBe('01a00000-0000-7000-8000-000000000001');
	});

	test('answers for a page that states no transcript path', async () => {
		const found = await agentIdsForSeatNames(['no-transcript'], dirs);
		expect(found.get('no-transcript')).toBe('01a034d8-08eb-7000-a5aa-7a855b0776d3');
	});

	test('leaves out a page that states no id', async () => {
		const found = await agentIdsForSeatNames(['no-id'], dirs);
		expect(found.has('no-id')).toBe(false);
	});

	test('answers for no name that would address a file outside the seat directories', async () => {
		const found = await agentIdsForSeatNames(['../elsewhere', '..', ''], dirs);
		expect(found.size).toBe(0);
	});

	test('asks once for a repeated name and answers nothing for an empty list', async () => {
		expect((await agentIdsForSeatNames([], dirs)).size).toBe(0);
		const found = await agentIdsForSeatNames(['dalla', 'dalla'], dirs);
		expect(found.size).toBe(1);
	});
});

describe('seatNamesOnDisk', () => {
	test('answers every seat that has a page, from both directories', async () => {
		const names = await seatNamesOnDisk(dirs);
		expect(names.has('dalla')).toBe(true);
		expect(names.has('left-behind')).toBe(true);
		expect(names.has('nobody')).toBe(false);
	});

	test('takes each name off a page file name and passes over what is not a page', async () => {
		const names = await seatNamesOnDisk(dirs);
		expect(names.has('not-a-page.txt')).toBe(false);
		expect(names.has('not-a-page')).toBe(false);
		expect([...names].sort()).toEqual(['astra', 'dalla', 'left-behind', 'no-id', 'no-transcript']);
	});

	test('contributes nothing for a directory that is not there and keeps the rest', async () => {
		const names = await seatNamesOnDisk([path.join(root, 'not-here'), ...dirs]);
		expect(names.has('dalla')).toBe(true);
		expect((await seatNamesOnDisk([path.join(root, 'not-here')])).size).toBe(0);
	});
});

describe('frontmatterValue', () => {
	test('reads a key from the frontmatter block and not from the body below it', () => {
		const text = '---\nid: from-block\n---\n\nid: from-body\n';
		expect(frontmatterValue(text, 'id')).toBe('from-block');
	});

	test('answers nothing for a file that opens no frontmatter block', () => {
		expect(frontmatterValue('id: loose\n', 'id')).toBeNull();
	});

	test('strips the quotes a title carries', () => {
		expect(frontmatterValue('---\ntitle: "dalla"\n---\n', 'title')).toBe('dalla');
	});
});
