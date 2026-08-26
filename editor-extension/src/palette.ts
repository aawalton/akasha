/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { BLUE, GREEN, ORANGE, PURPLE, RED, YELLOW } from '../../design-tokens/semantic.ts';
import type { Rgb } from '../../design-tokens/surface.ts';

/**
 * Alan's palette, as the one place in this extension that says which colour names there are.
 *
 * ONE SET FOR EVERY SURFACE THAT DRAWS A NAME. A seat's turn state names a colour, and two readers
 * turn that name into something on screen: the terminal tab strip, which paints a hex, and the
 * agent and project trees, which hand the workbench a `ThemeColor` id. They used to hold separate
 * sets — six names beside the strip and three hand-spelled beside the trees — so a further state
 * drawn in one of the other three would have been painted on the strip and dropped in the trees.
 * A tree row drawn at the default is indistinguishable from a row carrying no state at all, so
 * that came apart silently. Both readers now take their names from here.
 *
 * THE HEXES ARE NOT WRITTEN HERE and must not be. `akasha/design-tokens` is the palette's mirror
 * for runtimes that cannot resolve a CSS variable — which is what a tab strip generated from a
 * string is. A hex spelled in this repository would be a second copy with nothing watching it,
 * and the whole of this project is that Alan sees the design system's own colour rather than a
 * near one.
 *
 * WIDER THAN THE STATES USE. A turn state resolves to green, blue or yellow today. The day the
 * corpus draws a further state in another of Alan's colours, nothing in this extension is what has
 * to change.
 */
const PALETTE: Readonly<Record<string, Rgb>> = {
	blue: BLUE,
	green: GREEN,
	orange: ORANGE,
	purple: PURPLE,
	red: RED,
	yellow: YELLOW,
};

/**
 * Every name the palette declares, which is the set each reader accepts.
 *
 * DERIVED RATHER THAN SPELLED, because a spelled copy is what the two readers disagreed through.
 * A name added to `PALETTE` is in here on the next import, with nothing to remember.
 */
export const PALETTE_NAMES: ReadonlySet<string> = new Set(Object.keys(PALETTE));

/** A design token's sRGB triple as the `#rrggbb` a stylesheet takes. */
function toHex(rgb: Rgb): string {
	const channel = (value: number): string =>
		Math.max(0, Math.min(255, Math.round(value * 255)))
			.toString(16)
			.padStart(2, '0');
	return `#${channel(rgb[0])}${channel(rgb[1])}${channel(rgb[2])}`;
}

/**
 * The colour a name resolves to, or undefined where the palette declares no such name.
 *
 * A NAME THAT RESOLVES TO NOTHING IS NO ANSWER. The corpus is what stops a state naming a colour
 * nothing declares; this is the reader, so an unknown name is dropped rather than guessed at. A
 * row drawn in the wrong state's colour is worse than one drawn in none, because nothing about it
 * looks wrong.
 */
export function colorNamed(name: string): string | undefined {
	const rgb = PALETTE[name.toLowerCase()];
	return rgb === undefined ? undefined : toHex(rgb);
}
