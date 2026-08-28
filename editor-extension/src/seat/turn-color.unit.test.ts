import { describe, expect, test } from 'bun:test';
import { colorNamed } from '../palette.ts';
import { coloursOf, readSeatTurnColors } from './turn-color.ts';

describe('coloursOf', () => {
	test('reads each seat\'s colour name back as a colour value', () => {
		const found = coloursOf({ busy: 'green', arranged: 'blue' });
		expect(found.get('busy')).toBe(colorNamed('green'));
		expect(found.get('arranged')).toBe(colorNamed('blue'));
	});

	test('leaves out every seat the answer does not name', () => {
		const found = coloursOf({ busy: 'green' });
		expect(found.has('quiet')).toBe(false);
		expect(found.size).toBe(1);
	});

	test('omits a seat whose colour the palette does not declare', () => {
		const found = coloursOf({ odd: 'chartreuse', fine: 'yellow' });
		expect(found.has('odd')).toBe(false);
		expect(found.get('fine')).toBe(colorNamed('yellow'));
	});

	test('answers an empty map where nothing is named', () => {
		expect(coloursOf({}).size).toBe(0);
	});
});

describe('readSeatTurnColors', () => {
	test('reads nothing where no seat was resolved', async () => {
		expect((await readSeatTurnColors([])).size).toBe(0);
	});
});
