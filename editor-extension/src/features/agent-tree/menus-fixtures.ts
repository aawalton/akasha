import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import type { SeatMode } from '../../seat/mode.ts';
import { seatContextValue } from './toggles.ts';

const MENU_ITEM_SCHEMA = z.object({
	command: z.string(),
	when: z.string(),
	group: z.string(),
});

const MANIFEST_SCHEMA = z.object({
	contributes: z.object({
		commands: z.array(z.object({ command: z.string(), title: z.string() }).loose()),
		menus: z.object({
			'view/item/context': z.array(MENU_ITEM_SCHEMA),
			'editor/title/context/replace': z.array(MENU_ITEM_SCHEMA),
		}).loose(),
	}),
});

const MANIFEST_PATH = path.join(import.meta.dir, '..', '..', '..', 'package.json');
export const manifest = MANIFEST_SCHEMA.parse(JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')));
export const rowItems = manifest.contributes.menus['view/item/context'];
export const tabItems = manifest.contributes.menus['editor/title/context/replace'];

const VIEW_ITEM_RE = /viewItem\s*=~\s*\/(.+?)\/\s*$/;

export const CLAUSE_SCHEMA = z.tuple([z.string(), z.string()]);

export function matchesRow(when: string, contextValue: string): boolean {
	const [, pattern] = CLAUSE_SCHEMA.parse(VIEW_ITEM_RE.exec(when));
	return new RegExp(pattern).test(contextValue);
}

export function shownFor(live: boolean, place: SeatMode): readonly string[] {
	const value = seatContextValue(live, place);
	return rowItems.filter((i) => matchesRow(i.when, value)).map((i) => i.command);
}
