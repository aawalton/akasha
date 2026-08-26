/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import type { SeatMode } from '../../seat/mode';
import { seatContextValue } from './toggles';

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

/** The whole match and its one capture — the pattern VS Code would evaluate. */
export const CLAUSE_SCHEMA = z.tuple([z.string(), z.string()]);

/**
 * The `viewItem =~ /.../` half of a clause, as VS Code evaluates it. The rest of
 * the clause pins the view, which is not what these tests are about.
 *
 * The match is PARSED rather than indexed into. A clause carrying no such regex
 * would otherwise read as a pattern of `undefined`, which matches nothing and would
 * report every toggle as correctly hidden — a broken manifest passing as a tidy
 * one. Parsing turns that into a failure naming the clause.
 */
export function matchesRow(when: string, contextValue: string): boolean {
	const [, pattern] = CLAUSE_SCHEMA.parse(VIEW_ITEM_RE.exec(when));
	return new RegExp(pattern).test(contextValue);
}

/** Every row command whose clause fires for a seat in this state. */
export function shownFor(live: boolean, place: SeatMode): readonly string[] {
	const value = seatContextValue(live, place);
	return rowItems.filter((i) => matchesRow(i.when, value)).map((i) => i.command);
}
