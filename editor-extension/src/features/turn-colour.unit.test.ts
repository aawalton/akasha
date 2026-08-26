/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * WHAT ELSE WOULD CATCH THIS. Nothing. A `ThemeColor` naming an id the manifest does not
 * contribute is not an error anywhere: VS Code paints the row at the default and says nothing,
 * which is indistinguishable from a seat whose state nothing recorded. The typechecker sees only
 * a string, and the corpus that names the colour is in another repository entirely.
 *
 * SO THE SHIPPED MANIFEST IS READ OFF DISK and held against the palette, both ways and by value —
 * the same shape `check-design-tokens` holds `@shared/design-tokens` against `tokens.css` in, and
 * the same shape the tree manifest tests next door use. The manifest cannot take anything but a
 * literal hex, so the three that stood in it were an unwatched second copy of the palette. They
 * are watched here.
 */

import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { colorNamed, PALETTE_NAMES } from '../palette';
import { COLOUR_ID_PREFIX, turnColourIn, turnStateSaid } from './turn-colour';

describe('the colour a turn path asks for', () => {
	test('a contributed colour resolves to this extension’s id for it', () => {
		expect(turnColourIn('/turn/green/019ff866-6ce4-7713-8672-14c24e89d4e0')).toBe('ops.color.green');
	});

	test('every colour the palette declares resolves, none of them being a special case', () => {
		for (const name of PALETTE_NAMES) {
			expect(turnColourIn(`/turn/${name}/an-id`)).toBe(`${COLOUR_ID_PREFIX}${name}`);
		}
	});

	// The reason this file was widened. A state the corpus draws purple used to reach here as a
	// name nothing matched, and its rows drew at the default while the tab strip painted it.
	test('a colour the corpus may draw a further state in resolves rather than falling back', () => {
		expect(turnColourIn('/turn/purple/an-id')).toBe('ops.color.purple');
	});

	// Still refused rather than trusted through: an id the manifest does not contribute paints
	// nothing and reports nothing, so a name outside the palette must not become one.
	test('a name the palette does not declare asks for no id at all', () => {
		expect(turnColourIn('/turn/teal/an-id')).toBeUndefined();
	});

	// A subagent is an agent taking a turn, so it is drawn for the state it is in rather than for
	// being less than a seat. What keeps the two kinds apart on screen is the badge, which the
	// provider reads off the same prefix.
	test('a subagent carrying a colour resolves it, the same as a seat carrying one', () => {
		expect(turnColourIn('/subagent/green/toolu_01A8698VS9CzoGuYsvcGVaU4')).toBe('ops.color.green');
	});

	// The fallback the two-segment form exists for: a harness the panel could not reach leaves a
	// subagent with no colour, and its row draws as it did before it had a state.
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

	// The manifest takes a literal and nothing else, so this is the only thing standing between
	// Alan's design system and a hex in this repository drifting off it unnoticed.
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

	// A variant left out is a theme in which the row draws at nothing, which reads as a row with
	// no state. An entry added later is the one likely to be short a variant.
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
