/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * WHAT ELSE WOULD CATCH THIS. Nothing. A colour name that resolves to nothing is dropped on the
 * way through, which draws the row or the tab at no colour — the same reading as a seat that
 * carried no state at all. Neither the typechecker nor the workbench has anything to say about it.
 */

import { describe, expect, test } from 'bun:test';
import { BLUE, GREEN, ORANGE, PURPLE, RED, YELLOW } from '../../design-tokens/semantic.ts';
import type { Rgb } from '../../design-tokens/surface.ts';
import { colorNamed, PALETTE_NAMES } from './palette';

/** The design system's own value for a name, spelled the long way so this test is not the code. */
function hexOf(rgb: Rgb): string {
	return `#${[rgb[0], rgb[1], rgb[2]]
		.map((c) => Math.round(c * 255).toString(16).padStart(2, '0'))
		.join('')}`;
}

describe('the names the palette declares', () => {
	// The whole point of the module: one set, so a name added upstream reaches every reader at
	// once. Held against the tokens package's own colour exports rather than a list typed out
	// here — a list here would be the third hand-spelled copy, which is the fault this replaced.
	test('are Alan\'s six, and each resolves to the design system\'s own value', () => {
		const declared: Record<string, Rgb> = {
			blue: BLUE,
			green: GREEN,
			orange: ORANGE,
			purple: PURPLE,
			red: RED,
			yellow: YELLOW,
		};
		expect([...PALETTE_NAMES].sort()).toEqual(Object.keys(declared).sort());
		for (const [name, rgb] of Object.entries(declared)) {
			expect(colorNamed(name)).toBe(hexOf(rgb));
		}
	});

	// The colour a working seat is drawn in, and the one Alan reads the fleet by: green means
	// something is moving. A near-green would look right and be wrong.
	test('answer the design system\'s own token rather than a near one', () => {
		expect(colorNamed('green')).toBe(hexOf(GREEN));
	});

	test('resolve whatever case the corpus happens to answer in', () => {
		expect(colorNamed('GREEN')).toBe(colorNamed('green'));
	});

	// A name outside the palette is dropped rather than guessed at: a row drawn in the wrong
	// state's colour is worse than one drawn in none, since nothing looks wrong.
	test('answer nothing for a name the palette does not declare', () => {
		expect(colorNamed('teal')).toBeUndefined();
		expect(PALETTE_NAMES.has('teal')).toBe(false);
	});
});
