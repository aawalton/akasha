import { z } from 'zod';

export interface ToolCallEntry {
	readonly kind: 'tool';
	readonly toolUseId: string;
	readonly name: string;
	readonly subject: string;
	readonly input: string;
	readonly result: string | null;
	readonly isError: boolean;
}

export interface ProseEntry {
	readonly kind: 'user' | 'assistant';
	readonly text: string;
	readonly timestamp: string | null;
}

export interface ThinkingEntry {
	readonly kind: 'thinking';
	readonly text: string;
}

export type Entry = ProseEntry | ThinkingEntry | ToolCallEntry;

const RENDERED_RECORD_TYPES: ReadonlySet<string> = new Set(['user', 'assistant']);

const rawBlockSchema = z.looseObject({
	type: z.string().optional(),
	text: z.string().optional(),
	thinking: z.string().optional(),
	id: z.string().optional(),
	name: z.string().optional(),
	input: z.unknown().optional(),
	tool_use_id: z.string().optional(),
	content: z.unknown().optional(),
	is_error: z.boolean().optional(),
});
type RawBlock = z.infer<typeof rawBlockSchema>;

const rawRecordSchema = z.looseObject({
	type: z.string().optional(),
	timestamp: z.string().optional(),
	isMeta: z.boolean().optional(),
	message: z.looseObject({ content: z.unknown().optional() }).optional(),
});
type RawRecord = z.infer<typeof rawRecordSchema>;

const toolInputSchema = z.record(z.string(), z.unknown());

const messageContentSchema = z.union([z.string(), z.array(rawBlockSchema)]);

const SUBJECT_FIELDS: Readonly<Record<string, readonly string[]>> = {
	Bash: ['command'],
	Read: ['file_path'],
	Write: ['file_path'],
	Edit: ['file_path'],
	NotebookEdit: ['notebook_path'],
	Grep: ['pattern'],
	Glob: ['pattern'],
	Agent: ['description'],
	Task: ['description'],
	WebFetch: ['url'],
	WebSearch: ['query'],
	SendMessage: ['summary'],
};

function firstLine(value: string, limit = 200): string {
	const flattened = value.replace(/\s+/g, ' ').trim();
	return flattened.length > limit ? `${flattened.slice(0, limit - 1)}…` : flattened;
}

export function toolSubject(name: string, input: unknown): string {
	const parsed = toolInputSchema.safeParse(input);
	if (!parsed.success) { return ''; }
	const record = parsed.data;
	for (const field of SUBJECT_FIELDS[name] ?? []) {
		const value = record[field];
		if (typeof value === 'string' && value.trim() !== '') { return firstLine(value); }
	}
	for (const value of Object.values(record)) {
		if (typeof value === 'string' && value.trim() !== '') { return firstLine(value); }
	}
	for (const [key, value] of Object.entries(record)) {
		if (typeof value === 'number' || typeof value === 'boolean') {
			return firstLine(`${key}=${String(value)}`);
		}
	}
	return '';
}

function resultText(content: unknown): string {
	const parsed = messageContentSchema.safeParse(content);
	if (!parsed.success) { return ''; }
	if (typeof parsed.data === 'string') { return parsed.data; }
	return parsed.data
		.map((block) => block.text ?? '')
		.filter((part) => part !== '')
		.join('\n');
}

function stringify(input: unknown): string {
	if (typeof input === 'string') { return input; }
	try {
		return JSON.stringify(input, null, 2) ?? '';
	} catch {
		return String(input);
	}
}

function parseLine(line: string): RawRecord | null {
	const trimmed = line.trim();
	if (trimmed === '') { return null; }
	try {
		const parsed = rawRecordSchema.safeParse(JSON.parse(trimmed));
		return parsed.success ? parsed.data : null;
	} catch {
		return null;
	}
}

function blocksOf(record: RawRecord): readonly RawBlock[] {
	const parsed = messageContentSchema.safeParse(record.message?.content);
	if (!parsed.success) { return []; }
	if (typeof parsed.data === 'string') { return [{ type: 'text', text: parsed.data }]; }
	return parsed.data;
}

export function buildEntries(text: string): readonly Entry[] {
	const records: RawRecord[] = [];
	for (const line of text.split('\n')) {
		const record = parseLine(line);
		if (record !== null) { records.push(record); }
	}

	const results = new Map<string, { text: string; isError: boolean }>();
	for (const record of records) {
		for (const block of blocksOf(record)) {
			if (block.type !== 'tool_result' || typeof block.tool_use_id !== 'string') { continue; }
			results.set(block.tool_use_id, {
				text: resultText(block.content),
				isError: block.is_error === true,
			});
		}
	}

	const entries: Entry[] = [];
	for (const record of records) {
		if (typeof record.type !== 'string' || !RENDERED_RECORD_TYPES.has(record.type)) { continue; }
		if (record.isMeta === true) { continue; }

		const kind = record.type === 'user' ? 'user' : 'assistant';
		const timestamp = typeof record.timestamp === 'string' ? record.timestamp : null;

		for (const block of blocksOf(record)) {
			if (block.type === 'text' && typeof block.text === 'string') {
				if (block.text.trim() === '') { continue; }
				entries.push({ kind, text: block.text, timestamp });
			} else if (block.type === 'thinking' && typeof block.thinking === 'string') {
				if (block.thinking.trim() === '') { continue; }
				entries.push({ kind: 'thinking', text: block.thinking });
			} else if (block.type === 'tool_use' && typeof block.id === 'string') {
				const name = typeof block.name === 'string' ? block.name : 'tool';
				const matched = results.get(block.id);
				entries.push({
					kind: 'tool',
					toolUseId: block.id,
					name,
					subject: toolSubject(name, block.input),
					input: stringify(block.input),
					result: matched?.text ?? null,
					isError: matched?.isError ?? false,
				});
			}
		}
	}
	return entries;
}
