import { readdir, readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { seatDirs } from './turn-color.ts';

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

export function seatNameOf(fileName: string): string {
	const dot = fileName.indexOf('.');
	return dot <= 0 ? fileName : fileName.slice(0, dot);
}

function addressesAPage(name: string): boolean {
	return name !== '' && name !== '.' && name !== '..' && !name.includes('/') && !name.includes('\\');
}

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
