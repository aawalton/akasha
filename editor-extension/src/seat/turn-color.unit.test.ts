/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import { colorNamed } from '../palette';
import { coloursFromAnswer, readSeatTurnColors } from './turn-color';

const FROM = 'tools/agent-turn-colours.ts';

function answering(colours: Record<string, string>): string {
	return JSON.stringify({ colours });
}

/** The same answer under the key the command is being renamed to. */
function answeringColors(colors: Record<string, string>): string {
	return JSON.stringify({ colors });
}

// What `colorNamed` itself answers is exercised in `src/palette.unit.test.ts`, beside the module
// that now holds it. What is left here is this file's own half: what the reader does with an
// answer.

describe('coloursFromAnswer', () => {
	// The reading the tab strip is drawn from: a name the corpus resolved becomes a colour a
	// stylesheet can take, with no hop through the corpus at draw time and no state machine here.
	test('reads each seat\'s colour name back as a colour value', () => {
		const found = coloursFromAnswer(answering({ busy: 'green', arranged: 'blue' }), FROM);
		expect(found.get('busy')).toBe(colorNamed('green'));
		expect(found.get('arranged')).toBe(colorNamed('blue'));
	});

	// A seat the command answered for by nothing is drawn in nothing. It must be left out of the
	// map entirely, which is what tells the sweep to take a colour back off rather than leave a
	// stale one on.
	test('leaves out every seat the answer does not name', () => {
		const found = coloursFromAnswer(answering({ busy: 'green' }), FROM);
		expect(found.has('quiet')).toBe(false);
		expect(found.size).toBe(1);
	});

	// A colour name nothing resolves reaches the map as nothing rather than as itself. Passed
	// through, it would be handed to the editor as a terminal colour and dropped there instead —
	// a failure one repository further from whoever could fix it.
	test('omits a seat whose colour the palette does not declare', () => {
		const found = coloursFromAnswer(answering({ odd: 'chartreuse', fine: 'yellow' }), FROM);
		expect(found.has('odd')).toBe(false);
		expect(found.get('fine')).toBe(colorNamed('yellow'));
	});

	// An answer with no seats in it is a true zero rather than a failure: a window whose
	// terminals all resolved to stopped seats is the ordinary case for this.
	test('answers an empty map for an answer naming no seat', () => {
		expect(coloursFromAnswer(answering({}), FROM).size).toBe(0);
	});

	// A command that changed underneath this reader throws rather than answering empty, because
	// an empty answer is the claim that no tab is coloured and would clear the whole strip.
	test('throws on an answer that is not JSON', () => {
		expect(() => coloursFromAnswer('{not json', FROM)).toThrow();
	});

	test('throws on JSON carrying no colours record', () => {
		expect(() => coloursFromAnswer(JSON.stringify({ rows: [] }), FROM)).toThrow();
	});

	test('throws where a seat\'s colour is not a string at all', () => {
		expect(() => coloursFromAnswer(JSON.stringify({ colours: { busy: 3 } }), FROM)).toThrow();
	});

	// WHY BOTH SPELLINGS ARE READ. The command's record is `colours` today and `colors` after the
	// rename it is queued for. A build Alan is running was compiled against whichever spelling
	// stood when it was built, so the reader has to take the new one BEFORE the command starts
	// sending it — otherwise the commit that renames the key is the commit that takes the colour
	// off every tab in his window, and nothing in the strip says why.
	test('reads the record under the spelling the command is being renamed to', () => {
		const found = coloursFromAnswer(answeringColors({ busy: 'green' }), FROM);
		expect(found.get('busy')).toBe(colorNamed('green'));
	});

	// A command sending the pair through one release hands this the key it will be left with. The
	// two never disagree in practice; asserted so that the reader cannot be left preferring the
	// spelling that is going away.
	test('takes the new spelling where an answer carries both', () => {
		const both = JSON.stringify({ colors: { busy: 'green' }, colours: { busy: 'yellow' } });
		expect(coloursFromAnswer(both, FROM).get('busy')).toBe(colorNamed('green'));
	});

	test('reads an empty record under either spelling as a true zero', () => {
		expect(coloursFromAnswer(answeringColors({}), FROM).size).toBe(0);
	});

	test('throws where a seat\'s colour is not a string under the new spelling either', () => {
		expect(() => coloursFromAnswer(JSON.stringify({ colors: { busy: 3 } }), FROM)).toThrow();
	});
});

describe('readSeatTurnColors', () => {
	// No seat in the window is answered without starting a process. The sweep runs on every
	// change of focus, so the window Alan has no seat terminals in must cost nothing.
	test('asks nothing where no seat was resolved', async () => {
		expect((await readSeatTurnColors([])).size).toBe(0);
	});
});
