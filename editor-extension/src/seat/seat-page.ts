/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * What a seat's own page says about it, read from the memory checkout.
 *
 * THE PAGE IS THE AUTHORITY ON WHICH AGENT IS IN A SEAT, and nothing here reads a second copy of
 * that answer. A page cannot go stale about it, because its absence is what "no agent is in this
 * seat" means; see `pages/page-type/seat.md`, which puts it as the page standing while an agent is
 * present and going when none is, and its file stem being the seat name. So a `readdir` answers
 * which seats there are, and one `id` line answers who is in one.
 *
 * ONLY `id` IS REQUIRED OF A PAGE HERE. `features/transcript/sources.ts` reads these same files
 * and drops any that states no `transcript-path`, which is right for showing a transcript and
 * wrong for this: `agent-harness-worker` states none and is a seat all the same.
 */
import { readdir, readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { seatDirs } from './turn-color.ts';

/**
 * One string value out of a page's frontmatter block, read the way the hooks read it: the block
 * between the `---` markers, one `key: value` line, quotes stripped.
 *
 * READ HERE RATHER THAN IMPORTED — the instructions repository is the authority for the seat page
 * and cannot be imported, being in another repository while this bundle is built from this one.
 *
 * SPELLED ONCE, IN THE `seat/` LAYER. It stood privately in `features/transcript/sources.ts` and
 * is now wanted by two readers of the same files; a second copy is two parsers to keep agreeing
 * with one file format.
 */
export function frontmatterValue(text: string, key: string): string | null {
	const lines = text.split('\n');
	if (lines[0] !== '---') { return null; }
	for (let index = 1; index < lines.length; index += 1) {
		const line = lines[index];
		if (line === undefined || line === '---') { break; }
		if (line.startsWith(`${key}: `)) {
			return line.slice(key.length + 2).replace(/^"|"$/g, '') || null;
		}
	}
	return null;
}

/**
 * Whether this name can address a seat page at all.
 *
 * A SEAT NAME IS A FILE NAME AND NOTHING ELSE. The names reaching this module come from tmux
 * session names, and a name carrying a separator would join
 * into a path outside the seat directory — reading some unrelated page and handing back whatever
 * `id` it states as the agent in this tab's seat. That is a wrong colour rather than a missing
 * one, which is the failure nothing looks wrong about.
 */
/**
 * The seat name a page file carries, which is its file stem.
 *
 * A STEM CUTS AT THE FIRST PERIOD, everything after it being file suffixes: `ryn.seat.md` is the
 * seat `ryn`. `pages/page-type/seat.md` puts it as the file stem being the seat name, a page
 * file carrying its page type between the stem and `.md`.
 */
export function seatNameOf(fileName: string): string {
	const dot = fileName.indexOf('.');
	return dot <= 0 ? fileName : fileName.slice(0, dot);
}

function addressesAPage(name: string): boolean {
	return name !== '' && name !== '.' && name !== '..' && !name.includes('/') && !name.includes('\\');
}

/** The agent id stated by this seat's page, in the first of these directories holding one. */
async function agentIdOfSeat(name: string, dirs: readonly string[]): Promise<string | undefined> {
	if (!addressesAPage(name)) { return undefined; }
	for (const dir of dirs) {
		for (const fileName of [`${name}.seat.md`, `${name}.md`]) {
			let text: string;
			try {
				text = await readFile(path.join(dir, fileName), 'utf8');
			} catch {
				continue;
			}
			const id = frontmatterValue(text, 'id');
			if (id !== null) { return id; }
		}
	}
	return undefined;
}

/**
 * The agent working each of these seats, leaving out every name no page answers for.
 *
 * ABSENCE IS AN ANSWER RATHER THAN A FAULT. A name with no page is a seat no agent is in, and the
 * caller may take a colour off that tab on the strength of it. That is a different claim from the
 * harness being unreachable, which the caller keeps saying with `undefined` for the whole map.
 *
 * THE DIRECTORIES ARE A PARAMETER so that this can be exercised against a tree on disk without a
 * process and without an environment. They default to `seatDirs`, which is the pair the harness
 * itself resolves and which the sweep already watches — so what is read here is what the watcher
 * fires on.
 */
export async function agentIdsForSeatNames(
	names: readonly string[],
	dirs: readonly string[] = seatDirs()
): Promise<ReadonlyMap<string, string>> {
	const found = new Map<string, string>();
	await Promise.all(
		[...new Set(names)].map(async (name) => {
			const id = await agentIdOfSeat(name, dirs);
			if (id !== undefined) { found.set(name, id); }
		})
	);
	return found;
}

/**
 * Every seat that has a page right now, by name.
 *
 * A SEAT'S PAGE STANDING IS WHAT "AN AGENT IS IN THIS SEAT" MEANS, so this is the set a name
 * read off something else is checked against. `pages/page-type/seat.md` puts it as the page
 * standing while an agent is present and going when none is, and its file stem being the seat
 * name — so a `readdir` is the whole reading.
 *
 * AN UNREADABLE DIRECTORY CONTRIBUTES NOTHING rather than failing the set. The pages are
 * mid-move between two directories and one of them is routinely absent.
 */
export async function seatNamesOnDisk(
	dirs: readonly string[] = seatDirs()
): Promise<ReadonlySet<string>> {
	const names = new Set<string>();
	await Promise.all(
		dirs.map(async (dir) => {
			let files: readonly string[];
			try {
				files = await readdir(dir);
			} catch {
				return;
			}
			for (const file of files) {
				if (file.endsWith('.md')) { names.add(seatNameOf(file)); }
			}
		})
	);
	return names;
}
