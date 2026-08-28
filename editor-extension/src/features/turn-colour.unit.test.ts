import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { colorNamed, PALETTE_NAMES } from '../palette.ts';
import { COLOUR_ID_PREFIX, turnColourIn, turnStateSaid } from './turn-colour.ts';

describe('the colour a turn path asks for', () => {
	test('a contributed colour resolves to this extension’s id for it', () => {
		expect(turnColourIn('/turn/green/019ff866-6ce4-7713-8672-14c24e89d4e0')).toBe('ops.color.green');
	});

	test('every colour the palette declares resolves, none of them being a special case', () => {
		for (const name of PALETTE_NAMES) {
			expect(turnColourIn(`/turn/${name}/an-id`)).toBe(`${COLOUR_ID_PREFIX}${name}`);
		}
	});

	test('a colour the corpus may draw a further state in resolves rather than falling back', () => {
		expect(turnColourIn('/turn/purple/an-id')).toBe('ops.color.purple');
	});

	test('a name the palette does not declare asks for no id at all', () => {
		expect(turnColourIn('/turn/teal/an-id')).toBeUndefined();
	});

	test('a subagent carrying a colour resolves it, the same as a seat carrying one', () => {
		expect(turnColourIn('/subagent/green/toolu_01A8698VS9CzoGuYsvcGVaU4')).toBe('ops.color.green');
	});

	test('a row with no colour segment is left to the muted branch, whichever kind asked', () => {
		expect(turnColourIn('/stopped/an-id')).toBeUndefined();
		expect(turnColourIn('/subagent/an-id')).toBeUndefined();
	});
});

describe('the manifest and the palette name the same colours', () => {
	const MANIFEST_SCHEMA = z.object({
		contributes: z.object({
			colors: z.array(
				z.object({
					id: z.string(),
					description: z.string(),
					defaults: z.record(z.string(), z.string()),
				}).loose()
			),
		}).loose(),
	});

	const manifest = MANIFEST_SCHEMA.parse(
		JSON.parse(readFileSync(`${import.meta.dir}/../../package.json`, 'utf8'))
	);
	const contributed = manifest.contributes.colors.filter((one) => one.id.startsWith(COLOUR_ID_PREFIX));

	test('every name the palette declares is contributed, an id nothing contributes painting nothing', () => {
		const ids = new Set(contributed.map((one) => one.id));
		const missing = [...PALETTE_NAMES].filter((name) => !ids.has(`${COLOUR_ID_PREFIX}${name}`)).sort();
		expect(missing).toEqual([]);
	});

	test('every colour contributed under this prefix is a name the palette declares', () => {
		const stray = contributed
			.map((one) => one.id.slice(COLOUR_ID_PREFIX.length))
			.filter((name) => !PALETTE_NAMES.has(name))
			.sort();
		expect(stray).toEqual([]);
	});

	test('every contributed default is the palette’s own value, in every theme variant', () => {
		const drifted: string[] = [];
		for (const one of contributed) {
			const expected = colorNamed(one.id.slice(COLOUR_ID_PREFIX.length));
			for (const [variant, value] of Object.entries(one.defaults)) {
				if (value !== expected) {
					drifted.push(`${one.id} ${variant} = ${value}, the palette says ${String(expected)}`);
				}
			}
		}
		expect(drifted).toEqual([]);
	});

	test('each contributed colour names all four theme variants', () => {
		const wanted = ['dark', 'highContrast', 'highContrastLight', 'light'];
		for (const one of contributed) {
			expect(Object.keys(one.defaults).sort()).toEqual(wanted);
		}
	});
});

describe('what a row says about its turn', () => {
	test('a waiting seat names what it waits on, which is the whole of what waiting adds', () => {
		expect(turnStateSaid('waiting', 'open-question')).toBe('waiting on open-question');
	});

	test('a state with nothing to wait on stands alone', () => {
		expect(turnStateSaid('working', undefined)).toBe('working');
	});

	test('a seat that has recorded nothing says nothing, rather than saying unknown', () => {
		expect(turnStateSaid('unknown', undefined)).toBeUndefined();
		expect(turnStateSaid(undefined, undefined)).toBeUndefined();
	});
});
