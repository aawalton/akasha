import { BLUE, GREEN, ORANGE, PURPLE, RED, YELLOW, type Rgb } from '../../design-tokens/design-tokens.ts';

const PALETTE: Readonly<Record<string, Rgb>> = {
	blue: BLUE,
	green: GREEN,
	orange: ORANGE,
	purple: PURPLE,
	red: RED,
	yellow: YELLOW,
};

export const PALETTE_NAMES: ReadonlySet<string> = new Set(Object.keys(PALETTE));

function toHex(rgb: Rgb): string {
	const channel = (value: number): string =>
		Math.max(0, Math.min(255, Math.round(value * 255)))
			.toString(16)
			.padStart(2, '0');
	return `#${channel(rgb[0])}${channel(rgb[1])}${channel(rgb[2])}`;
}

export function colorNamed(name: string): string | undefined {
	const rgb = PALETTE[name.toLowerCase()];
	return rgb === undefined ? undefined : toHex(rgb);
}
