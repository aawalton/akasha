/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * What this extension makes of the colour names the corpus resolved.
 *
 * WHAT IS NO LONGER TESTED HERE: that a changed answer from `tools/agent-turn-colors.ts` arrives as
 * a stated error rather than as an uncoloured strip, and that the record is read under either
 * spelling. There is no longer a process between this file and the answer — `colorsOf` runs in this
 * one and TypeScript says what shape it returns — so there is no boundary for a shape to change
 * across. The two spellings were a build compiled against one talking to a command sending the
 * other; with one process there is one compile.
 *
 * What is left is this extension's own half: turning a name the corpus stated into a colour value,
 * and dropping every name the palette does not declare. What `colorNamed` itself answers is
 * exercised in `src/palette.unit.test.ts`, beside the module that holds it.
 */
import { describe, expect, test } from 'bun:test';
import { colorNamed } from '../palette';
import { coloursOf, readSeatTurnColors } from './turn-color';

describe('coloursOf', () => {
	// The reading the tab strip is drawn from: a name the corpus resolved becomes a colour a
	// stylesheet can take, with no hop through the corpus at draw time and no state machine here.
	test('reads each seat\'s colour name back as a colour value', () => {
		const found = coloursOf({ busy: 'green', arranged: 'blue' });
		expect(found.get('busy')).toBe(colorNamed('green'));
		expect(found.get('arranged')).toBe(colorNamed('blue'));
	});

	// A seat the read answered for by nothing is drawn in nothing. It must be left out of the map
	// entirely, which is what tells the sweep to take a colour back off rather than leave a stale
	// one on.
	test('leaves out every seat the answer does not name', () => {
		const found = coloursOf({ busy: 'green' });
		expect(found.has('quiet')).toBe(false);
		expect(found.size).toBe(1);
	});

	// A colour name nothing resolves reaches the map as nothing rather than as itself. Passed
	// through, it would be handed to the editor as a terminal colour and dropped there instead —
	// a failure one repository further from whoever could fix it.
	test('omits a seat whose colour the palette does not declare', () => {
		const found = coloursOf({ odd: 'chartreuse', fine: 'yellow' });
		expect(found.has('odd')).toBe(false);
		expect(found.get('fine')).toBe(colorNamed('yellow'));
	});

	// An answer with no seats in it is a true zero rather than a failure: a window whose terminals
	// all resolved to stopped seats is the ordinary case for this.
	test('answers an empty map where nothing is named', () => {
		expect(coloursOf({}).size).toBe(0);
	});
});

describe('readSeatTurnColors', () => {
	// No seat in the window opens a seat page. The sweep runs on every change of focus, so the
	// window Alan has no seat terminals in must cost nothing.
	test('reads nothing where no seat was resolved', async () => {
		expect((await readSeatTurnColors([])).size).toBe(0);
	});
});
