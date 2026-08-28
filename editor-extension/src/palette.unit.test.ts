import { describe, expect, test } from 'bun:test';
import { BLUE, GREEN, ORANGE, PURPLE, RED, YELLOW, type Rgb } from '../../design-tokens/design-tokens.ts';
import { colorNamed, PALETTE_NAMES } from './palette.ts';

function hexOf(rgb: Rgb): string {
	return `#${[rgb[0], rgb[1], rgb[2]]
		.map((c) => Math.round(c * 255).toString(16).padStart(2, '0'))
		.join('')}`;
}

describe('the names the palette declares', () => {
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

	test('answer the design system\'s own token rather than a near one', () => {
		expect(colorNamed('green')).toBe(hexOf(GREEN));
	});

	test('resolve whatever case the corpus happens to answer in', () => {
		expect(colorNamed('GREEN')).toBe(colorNamed('green'));
	});

	test('answer nothing for a name the palette does not declare', () => {
		expect(colorNamed('teal')).toBeUndefined();
		expect(PALETTE_NAMES.has('teal')).toBe(false);
	});
});
