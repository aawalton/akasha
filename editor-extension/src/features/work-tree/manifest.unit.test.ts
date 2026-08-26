/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * That the panel the manifest contributes is the panel this code drives.
 *
 * The two are joined by bare strings and NOTHING TYPECHECKS THE JOIN. A view id that does not match
 * leaves a panel that is permanently empty — `createTreeView` registers against an id the workbench
 * has never heard of, and there is no error anywhere. A refresh command id that does not match
 * leaves a button that throws "command not found" on the one click it exists for. Both survive a
 * compile, both survive the tests next door, and both are invisible until somebody opens the panel.
 *
 * So the SHIPPED manifest is read off disk and held against the constants the extension actually
 * uses — the same shape as `domain-tree/manifest.unit.test.ts` and `agent-tree/menus.unit.test.ts`,
 * for the same reason. Four seats edit this one manifest, which is the other half of why the join
 * is asserted rather than read.
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

/** The two panels this one is meant to stand BESIDE rather than inside. */
const AGENTS_CONTAINER = 'opsAgents';
const DOMAINS_CONTAINER = 'opsDomains';

describe('the Work container', () => {
	test('is a container of its own in the secondary side bar, not a view inside another panel', () => {
		const containers = contributes.viewsContainers.secondarySidebar.map((one) => one.id);
		expect(containers).toContain(CONTAINER_ID);
		expect(CONTAINER_ID).not.toBe(AGENTS_CONTAINER);
		expect(CONTAINER_ID).not.toBe(DOMAINS_CONTAINER);
		// The criterion in Alan's own words: its own container, beside Agents and Domains, so its
		// name stands in the top strip with theirs. A view added under either of those containers
		// would nest it inside that panel, and the word Work would never reach the strip.
		for (const beside of [AGENTS_CONTAINER, DOMAINS_CONTAINER]) {
			expect(containers).toContain(beside);
			expect((contributes.views[beside] ?? []).map((one) => one.id)).not.toContain(VIEW_ID);
		}
	});

	test('is titled Work, which is the word that stands in the top strip', () => {
		const container = contributes.viewsContainers.secondarySidebar.find((one) => one.id === CONTAINER_ID);
		expect(container?.title).toBe('Work');
	});

	test('holds exactly the one view this extension creates', () => {
		expect((contributes.views[CONTAINER_ID] ?? []).map((one) => one.id)).toEqual([VIEW_ID]);
	});

	test('every container in the strip is a distinct id, four seats editing this one manifest', () => {
		const containers = contributes.viewsContainers.secondarySidebar.map((one) => one.id);
		expect(new Set(containers).size).toBe(containers.length);
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

	test('it sits in this view title and no other, the way the other two refreshes do', () => {
		const inTitle = contributes.menus['view/title'].filter((one) => one.command === REFRESH_COMMAND);
		expect(inTitle).toHaveLength(1);
		expect(inTitle[0]?.when).toBe(`view == ${VIEW_ID}`);
		expect(inTitle[0]?.group).toBe('navigation');
	});
});

describe('what this panel deliberately does not contribute', () => {
	/**
	 * A project has no process, so none of the Agents tree's seat commands has a meaning here.
	 * Acting on a project is `ops project`, which is a seat's work rather than a click's. This
	 * asserts the absence rather than trusting it: a row command copied across during a later
	 * change would offer Alan an action that cannot work, and a disabled-looking menu item on a
	 * reading surface is worse than no menu at all.
	 */
	test('no row-level menu item is contributed against this view', () => {
		const rowMenus = z
			.object({ 'view/item/context': z.array(z.object({ when: z.string() }).loose()).optional() })
			.parse(contributes.menus)['view/item/context'] ?? [];
		expect(rowMenus.filter((one) => one.when.includes(VIEW_ID))).toHaveLength(0);
	});
});
