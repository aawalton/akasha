import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { z } from 'zod';
import { CONTAINER_ID, REFRESH_COMMAND, VIEW_ID } from './ids.ts';

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

const AGENTS_CONTAINER = 'opsAgents';

describe('the Domains container', () => {
	test('is a container of its own in the secondary side bar, not a view inside Agents', () => {
		const containers = contributes.viewsContainers.secondarySidebar.map((one) => one.id);
		expect(containers).toContain(CONTAINER_ID);
		expect(containers).toContain(AGENTS_CONTAINER);
		expect(CONTAINER_ID).not.toBe(AGENTS_CONTAINER);
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
	test('no row-level menu item is contributed against this view', () => {
		const rowMenus = z
			.object({ 'view/item/context': z.array(z.object({ when: z.string() }).loose()).optional() })
			.parse(contributes.menus)['view/item/context'] ?? [];
		expect(rowMenus.filter((one) => one.when.includes(VIEW_ID))).toHaveLength(0);
	});
});
