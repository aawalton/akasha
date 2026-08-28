import { describe, expect, test } from 'bun:test';
import { parseForestRows, parseStateColour } from './harness.ts';

const ROW = {
	id: '019ff866-6ce4-7713-8672-14c24e89d4e0',
	name: 'amy-code-editor-lead',
	parent_agent_id: null,
	principal: 'alan',
	launch: 'opened',
	mode: 'interactive',
	live: true,
	state: 'waiting',
	waitingOn: 'live-child',
	colour: 'blue',
};

describe('parseForestRows', () => {
	test('reads the rows the verb answered', () => {
		expect(parseForestRows({ rows: [ROW] })).toEqual([ROW]);
	});

	test('reads a row whose every optional field is absent', () => {
		const bare = {
			id: 'a',
			name: null,
			parent_agent_id: null,
			principal: null,
			launch: null,
			mode: null,
			live: false,
			state: null,
			waitingOn: null,
			colour: null,
		};
		expect(parseForestRows({ rows: [bare] })).toEqual([bare]);
	});

	test('a fleet with nothing live is an empty list rather than a refusal', () => {
		expect(parseForestRows({ rows: [] })).toEqual([]);
	});

	test('refuses an answer carrying no rows, rather than reading it as an empty fleet', () => {
		expect(() => parseForestRows({})).toThrow();
		expect(() => parseForestRows([ROW])).toThrow();
		expect(() => parseForestRows(null)).toThrow();
	});

	test('refuses a row with no id, which is a row that names no seat', () => {
		expect(() => parseForestRows({ rows: [{ ...ROW, id: '' }] })).toThrow();
		const { id: _dropped, ...withoutId } = ROW;
		expect(() => parseForestRows({ rows: [withoutId] })).toThrow();
	});

	test('refuses a row that does not say whether it is live', () => {
		expect(() => parseForestRows({ rows: [{ ...ROW, live: 'yes' }] })).toThrow();
	});

	test('refuses a field that is neither a string nor absent, rather than rendering it', () => {
		expect(() => parseForestRows({ rows: [{ ...ROW, name: 5 }] })).toThrow();
		expect(() => parseForestRows({ rows: [{ ...ROW, parent_agent_id: {} }] })).toThrow();
	});

	test('refuses the whole answer where one row among many is unreadable', () => {
		expect(() => parseForestRows({ rows: [ROW, { ...ROW, id: 'b' }, { live: true }] })).toThrow();
	});

	test('reads a row spelling its colour the way the verb is being renamed to spell it', () => {
		const { colour: _dropped, ...renamed } = ROW;
		expect(parseForestRows({ rows: [{ ...renamed, color: 'blue' }] })).toEqual([ROW]);
	});

	test('takes the new spelling where a row carries both', () => {
		const both = { ...ROW, color: 'blue', colour: 'yellow' };
		expect(parseForestRows({ rows: [both] })).toEqual([ROW]);
	});

	test('reads a row stating no colour under the new spelling as stating none', () => {
		const { colour: _dropped, ...renamed } = ROW;
		expect(parseForestRows({ rows: [{ ...renamed, color: null }] })).toEqual([
			{ ...ROW, colour: null },
		]);
	});

	test('refuses a row carrying the colour under neither spelling', () => {
		const { colour: _dropped, ...renamed } = ROW;
		expect(() => parseForestRows({ rows: [renamed] })).toThrow();
	});

	test('refuses a colour that is neither a string nor null under the new spelling', () => {
		const { colour: _dropped, ...renamed } = ROW;
		expect(() => parseForestRows({ rows: [{ ...renamed, color: 5 }] })).toThrow();
	});
});

describe('the colour a turn state is answered with', () => {
	test('the name under the state asked for is what comes back', () => {
		expect(parseStateColour({ colours: { working: 'green' } }, 'working')).toBe('green');
	});

	test('an answer that is not an object throws rather than resolving to nothing', () => {
		expect(() => parseStateColour('green', 'working')).toThrow();
	});

	test('an answer carrying no colours record throws, an envelope this cannot read being a fault', () => {
		expect(() => parseStateColour({ rows: [] }, 'working')).toThrow();
	});

	test('a state the answer says nothing about throws rather than coming back empty', () => {
		expect(() => parseStateColour({ colours: { idle: 'yellow' } }, 'working')).toThrow();
	});

	test('reads the record under the spelling the command is being renamed to', () => {
		expect(parseStateColour({ colors: { working: 'green' } }, 'working')).toBe('green');
	});

	test('takes the new spelling where an answer carries both', () => {
		const both = { colors: { working: 'green' }, colours: { working: 'yellow' } };
		expect(parseStateColour(both, 'working')).toBe('green');
	});

	test('an answer carrying the record under neither spelling throws', () => {
		expect(() => parseStateColour({ colors: null, colours: null }, 'working')).toThrow();
	});
});
