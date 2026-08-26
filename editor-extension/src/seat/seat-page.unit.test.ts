/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { agentIdsForSeatNames, frontmatterValue, seatNamesOnDisk } from './seat-page';

/**
 * A memory checkout mid-move: seat pages in `pages/seat`, and the `seats` directory they are
 * moving from still holding one. Written to disk rather than mocked, because what this module
 * does IS the file read — a mocked `readFile` would leave the join between a seat name and a
 * file name untested, and that join is the whole of it.
 */
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
	// No `transcript-path`, which is the shape `agent-harness-worker` had on 2026-08-25.
	await writeFile(path.join(current, 'no-transcript.seat.md'), PAGE('01a034d8-08eb-7000-a5aa-7a855b0776d3'));
	await writeFile(path.join(current, 'no-id.seat.md'), '---\npage-type-slug: seat\ntitle: "x"\n---\n');
	// Not a page, which is what tells the `.md` filter apart from a bare `readdir`.
	await writeFile(path.join(current, 'not-a-page.txt'), 'x');
	// Bare, which is what the retired directory holds: it was left behind before the rename.
	await writeFile(path.join(legacy, 'left-behind.md'), PAGE('01a00000-0000-7000-8000-000000000001'));
	await writeFile(path.join(root, 'elsewhere.md'), PAGE('01a00000-0000-7000-8000-000000000002'));
});

afterAll(async () => {
	await rm(root, { recursive: true, force: true });
});

describe('agentIdsForSeatNames', () => {
	// The join the seat's attribute store is reached by: that store is keyed by agent id, and
	// everything upstream of it — both arms of the terminal lookup — answers a seat name. The
	// page's own id is that agent, and a seat's file name is its seat name.
	test('answers the agent id each seat page states', async () => {
		const found = await agentIdsForSeatNames(['dalla', 'astra'], dirs);
		expect(found.get('dalla')).toBe('01a038e0-f5d0-7000-a371-096b7462ccb6');
		expect(found.get('astra')).toBe('01a038e5-0ae3-7000-87b3-eb6e833d34ef');
	});

	// A seat's page stands while an agent is present in it and goes when none is, so no page is
	// the reading that there is no agent here. It is left out rather than answered for.
	test('leaves out a name no page stands for', async () => {
		const found = await agentIdsForSeatNames(['dalla', 'nobody'], dirs);
		expect(found.has('nobody')).toBe(false);
		expect(found.size).toBe(1);
	});

	// Seat pages are mid-move between two directories and both hold live pages. Reading only the
	// one would go quiet for every seat on the other side of the move.
	test('reads both of the directories seat pages stand in', async () => {
		const found = await agentIdsForSeatNames(['left-behind'], dirs);
		expect(found.get('left-behind')).toBe('01a00000-0000-7000-8000-000000000001');
	});

	// Showing a transcript needs a `transcript-path` and colouring a tab does not. A seat stating
	// none is a seat all the same, and dropping it here would leave its tab uncoloured.
	test('answers for a page that states no transcript path', async () => {
		const found = await agentIdsForSeatNames(['no-transcript'], dirs);
		expect(found.get('no-transcript')).toBe('01a034d8-08eb-7000-a5aa-7a855b0776d3');
	});

	test('leaves out a page that states no id', async () => {
		const found = await agentIdsForSeatNames(['no-id'], dirs);
		expect(found.has('no-id')).toBe(false);
	});

	// A name carrying a separator would join into a path outside the seat directories and hand
	// back another page's id as the agent in this tab's seat — a wrong colour rather than a
	// missing one. Names arrive from tmux session names, which are not bound to be file names.
	test('answers for no name that would address a file outside the seat directories', async () => {
		const found = await agentIdsForSeatNames(['../elsewhere', '..', ''], dirs);
		expect(found.size).toBe(0);
	});

	// Two terminals attached to one seat ask one question, and a window holding no seat asks none.
	test('asks once for a repeated name and answers nothing for an empty list', async () => {
		expect((await agentIdsForSeatNames([], dirs)).size).toBe(0);
		const found = await agentIdsForSeatNames(['dalla', 'dalla'], dirs);
		expect(found.size).toBe(1);
	});
});

describe('seatNamesOnDisk', () => {
	// A seat's page stands while an agent is present in it and goes when none is, so the pages on
	// disk ARE the seats. Every name read off something else — a tmux session name — is checked
	// against this set, and a name that is not in it is a tab running no agent.
	test('answers every seat that has a page, from both directories', async () => {
		const names = await seatNamesOnDisk(dirs);
		expect(names.has('dalla')).toBe(true);
		expect(names.has('left-behind')).toBe(true);
		expect(names.has('nobody')).toBe(false);
	});

	// A seat's file stem is its seat name, so every suffix comes off and nothing else does — the
	// page type between the stem and `.md` included. Without the filter a file that is not a page
	// would stand as a seat named `not-a-page.txt`.
	test('takes each name off a page file name and passes over what is not a page', async () => {
		const names = await seatNamesOnDisk(dirs);
		expect(names.has('not-a-page.txt')).toBe(false);
		expect(names.has('not-a-page')).toBe(false);
		expect([...names].sort()).toEqual(['astra', 'dalla', 'left-behind', 'no-id', 'no-transcript']);
	});

	// The pages are mid-move between two directories and one of them is routinely absent. A
	// directory that is not there contributes nothing rather than costing the whole set, which is
	// what would leave every tab in the window unnamed.
	test('contributes nothing for a directory that is not there and keeps the rest', async () => {
		const names = await seatNamesOnDisk([path.join(root, 'not-here'), ...dirs]);
		expect(names.has('dalla')).toBe(true);
		expect((await seatNamesOnDisk([path.join(root, 'not-here')])).size).toBe(0);
	});
});

describe('frontmatterValue', () => {
	// The block is what is read, so a key repeated in the body is not a second answer.
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
