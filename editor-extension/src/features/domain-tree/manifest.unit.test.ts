/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * That the panel the manifest contributes is the panel this code drives.
 *
 * The two are joined by bare strings and NOTHING TYPECHECKS THE JOIN. A view id that does
 * not match leaves a panel that is permanently empty — `createTreeView` registers against
 * an id the workbench has never heard of, and there is no error anywhere. A refresh
 * command id that does not match leaves a button that throws "command not found" on the
 * one click it exists for. Both survive a compile, both survive the tests next door, and
 * both are invisible until somebody opens the panel.
 *
 * So the SHIPPED manifest is read off disk and held against the constants the extension
 * actually uses. This is the check the workbench would make, made without one — the same
 * shape as `agent-tree/menus.unit.test.ts`, for the same reason.
 */
import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import { CONTAINER_ID, REFRESH_COMMAND, VIEW_ID } from './ids';

const MANIFEST_SCHEMA = z.object({
	contributes: z.object({
		viewsContainers: z.object({
			secondarySidebar: z.array(z.object({ id: z.string(), title: z.string() }).loose()),
		}).loose(),
		views: z.record(z.string(), z.array(z.object({ id: z.string(), name: z.string() }).loose())),
		commands: z.array(z.object({ command: z.string(), title: z.string() }).loose()),
		menus: z.object({
			'view/title': z.array(z.object({ command: z.string(), when: z.string(), group: z.string() }).loose()),
		}).loose(),
	}),
});

const MANIFEST_PATH = path.join(import.meta.dir, '..', '..', '..', 'package.json');
const manifest = MANIFEST_SCHEMA.parse(JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')));
const contributes = manifest.contributes;

/** The Agents panel, which this one is meant to stand BESIDE rather than inside. */
const AGENTS_CONTAINER = 'opsAgents';

describe('the Domains container', () => {
	test('is a container of its own in the secondary side bar, not a view inside Agents', () => {
		const containers = contributes.viewsContainers.secondarySidebar.map((one) => one.id);
		expect(containers).toContain(CONTAINER_ID);
		expect(containers).toContain(AGENTS_CONTAINER);
		expect(CONTAINER_ID).not.toBe(AGENTS_CONTAINER);
		// The criterion in Alan's own words: parallel to Agents. A view added under the
		// Agents container instead would nest it inside that panel, and its name would
		// never reach the top strip.
		const agentsViews = contributes.views[AGENTS_CONTAINER] ?? [];
		expect(agentsViews.map((one) => one.id)).not.toContain(VIEW_ID);
	});

	test('is titled Domains, which is the word that stands in the top strip', () => {
		const container = contributes.viewsContainers.secondarySidebar.find((one) => one.id === CONTAINER_ID);
		expect(container?.title).toBe('Domains');
	});

	test('holds exactly the one view this extension creates', () => {
		const views = contributes.views[CONTAINER_ID] ?? [];
		expect(views.map((one) => one.id)).toEqual([VIEW_ID]);
	});
});

describe('the refresh affordance', () => {
	test('the command the extension registers is a command the manifest contributes', () => {
		expect(contributes.commands.map((one) => one.command)).toContain(REFRESH_COMMAND);
	});

	test('it carries an icon, without which it cannot draw in a view title bar', () => {
		const command = contributes.commands.find((one) => one.command === REFRESH_COMMAND);
		expect(command?.icon).toBe('$(refresh)');
	});

	test('it sits in this view title and no other, the way the Agents refresh does', () => {
		const inTitle = contributes.menus['view/title'].filter((one) => one.command === REFRESH_COMMAND);
		expect(inTitle).toHaveLength(1);
		expect(inTitle[0]?.when).toBe(`view == ${VIEW_ID}`);
		expect(inTitle[0]?.group).toBe('navigation');
	});
});

describe('what this panel deliberately does not contribute', () => {
	/**
	 * A domain has no process, so none of the Agents tree's four seat commands has a
	 * meaning here. This asserts the absence rather than trusting it: a row command copied
	 * across during a later change would offer Alan an action that cannot work, and a
	 * disabled-looking menu item on a reading surface is worse than no menu at all.
	 */
	test('no row-level menu item is contributed against this view', () => {
		const rowMenus = z
			.object({ 'view/item/context': z.array(z.object({ when: z.string() }).loose()).optional() })
			.parse(contributes.menus)['view/item/context'] ?? [];
		expect(rowMenus.filter((one) => one.when.includes(VIEW_ID))).toHaveLength(0);
	});
});
