import { describe, expect, test } from 'bun:test';
import { buildEntries, toolSubject } from './model.ts';

function line(record: unknown): string {
	return JSON.stringify(record);
}

function assistantText(text: string): string {
	return line({
		type: 'assistant',
		timestamp: '2026-08-10T12:00:00Z',
		message: { content: [{ type: 'text', text }] },
	});
}

function userText(text: string): string {
	return line({
		type: 'user',
		timestamp: '2026-08-10T12:00:00Z',
		message: { content: [{ type: 'text', text }] },
	});
}

function toolUse(id: string, name: string, input: unknown): string {
	return line({ type: 'assistant', message: { content: [{ type: 'tool_use', id, name, input }] } });
}

function toolResult(id: string, content: unknown, isError = false): string {
	return line({
		type: 'user',
		message: { content: [{ type: 'tool_result', tool_use_id: id, content, is_error: isError }] },
	});
}

describe('bookkeeping records', () => {
	test('the twelve machinery types render nothing', () => {
		const machinery = [
			'attachment',
			'system',
			'bridge-session',
			'last-prompt',
			'permission-mode',
			'mode',
			'custom-title',
			'ai-title',
			'agent-name',
			'file-history-snapshot',
			'queue-operation',
			'file-history-delta',
		];
		const text = machinery
			.map((type) => line({ type, message: { content: [{ type: 'text', text: 'x' }] } }))
			.join('\n');
		expect(buildEntries(text)).toEqual([]);
	});

	test('an unknown future record type renders nothing rather than junk', () => {
		const text = line({
			type: 'some-type-added-later',
			message: { content: [{ type: 'text', text: 'x' }] },
		});
		expect(buildEntries(text)).toEqual([]);
	});

	test('a harness-injected turn does not read as something a person wrote', () => {
		const text = line({
			type: 'user',
			isMeta: true,
			message: { content: [{ type: 'text', text: 'injected' }] },
		});
		expect(buildEntries(text)).toEqual([]);
	});
});

describe('prose', () => {
	test('reads in the order it was written', () => {
		const entries = buildEntries(
			[userText('first'), assistantText('second'), userText('third')].join('\n')
		);
		expect(entries.map((e) => (e.kind === 'tool' ? '' : e.text))).toEqual(['first', 'second', 'third']);
		expect(entries.map((e) => e.kind)).toEqual(['user', 'assistant', 'user']);
	});

	test('a string content field reads the same as a one-block array', () => {
		const entries = buildEntries(line({ type: 'user', message: { content: 'plain' } }));
		expect(entries).toHaveLength(1);
		expect(entries[0]).toMatchObject({ kind: 'user', text: 'plain' });
	});

	test('empty text contributes no entry', () => {
		expect(buildEntries(assistantText('   '))).toEqual([]);
	});
});

describe('tool calls', () => {
	test('a call is paired with the result that answers it', () => {
		const entries = buildEntries(
			[toolUse('t1', 'Bash', { command: 'git status' }), toolResult('t1', 'clean')].join('\n')
		);
		expect(entries).toHaveLength(1);
		expect(entries[0]).toMatchObject({
			kind: 'tool',
			name: 'Bash',
			subject: 'git status',
			result: 'clean',
			isError: false,
		});
	});

	test('the result does not also render as a user turn', () => {
		const entries = buildEntries(
			[toolUse('t1', 'Bash', { command: 'ls' }), toolResult('t1', 'a\nb\nc')].join('\n')
		);
		expect(entries.filter((e) => e.kind === 'user')).toEqual([]);
	});

	test('a call still running has no result rather than an empty one', () => {
		const entries = buildEntries(toolUse('t1', 'Bash', { command: 'sleep 60' }));
		expect(entries[0]).toMatchObject({ result: null });
	});

	test('a failed call carries its flag', () => {
		const entries = buildEntries(
			[toolUse('t1', 'Bash', { command: 'false' }), toolResult('t1', 'boom', true)].join('\n')
		);
		expect(entries[0]).toMatchObject({ isError: true, result: 'boom' });
	});

	test('a result given as an array of blocks is read, not dropped', () => {
		const entries = buildEntries(
			[
				toolUse('t1', 'Read', { file_path: '/a' }),
				toolResult('t1', [{ type: 'text', text: 'body' }]),
			].join('\n')
		);
		expect(entries[0]).toMatchObject({ result: 'body' });
	});
});

describe('subjects', () => {
	test('each tool shows the field that identifies its work', () => {
		expect(toolSubject('Bash', { command: 'git status' })).toBe('git status');
		expect(toolSubject('Read', { file_path: '/x/y.ts' })).toBe('/x/y.ts');
		expect(toolSubject('Grep', { pattern: 'foo.*bar' })).toBe('foo.*bar');
		expect(toolSubject('Agent', { description: 'Check the thing', prompt: 'long...' })).toBe(
			'Check the thing'
		);
	});

	test('a subject is always a single line', () => {
		const subject = toolSubject('Bash', { command: 'cat <<\'EOF\'\nline\nEOF' });
		expect(subject).not.toContain('\n');
	});

	test('a subject is bounded however long the command', () => {
		const subject = toolSubject('Bash', { command: 'x'.repeat(5_000) });
		expect(subject.length).toBeLessThanOrEqual(200);
		expect(subject.endsWith('…')).toBe(true);
	});

	test('a tool nobody listed still gets a subject', () => {
		expect(toolSubject('SomeNewTool', { thing: 'a value' })).toBe('a value');
	});

	test('a call whose input holds no text still gets a subject', () => {
		expect(toolSubject('SomeNewTool', { depth: 3 })).toBe('depth=3');
		expect(toolSubject('SomeNewTool', { fullPage: true })).toBe('fullPage=true');
	});

	test('an input with no fields at all yields an empty subject', () => {
		expect(toolSubject('SomeNewTool', {})).toBe('');
	});
});

describe('malformed input', () => {
	test('a half-written final line does not lose the lines before it', () => {
		const text = [assistantText('kept'), '{"type":"assistant","mess'].join('\n');
		expect(buildEntries(text)).toHaveLength(1);
	});

	test('an empty file yields nothing', () => {
		expect(buildEntries('')).toEqual([]);
	});
});
