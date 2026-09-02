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

// THE SAME FOLD, LINE BY LINE, SO A RESUMED READ AND A READ FROM THE FIRST BYTE CANNOT DISAGREE.
//
// The two-pass shape this replaces collected every tool result and only then emitted entries, which
// meant the whole transcript in hand before the first entry was known — a 14.6MB re-read and
// re-parse every second, and every subagent transcript beside it, all of it synchronous and so all
// of it the extension host's event loop stopped. A transcript only ever grows, so a poll should cost
// the bytes appended since the last one.
//
// A result can arrive in a later line than the call it answers, which is the only reason the pass
// existed. `toolAt` remembers where each call was emitted, and a result arriving later is written
// into it. A call emitted after its result reads the result off `results`. Both orders end where the
// two passes ended, and `buildEntries` is this fold over every line, so there is one grammar rather
// than a fast one and a slow one to be kept in step.
type ToolResult = { readonly text: string; readonly isError: boolean };

type MutableToolCallEntry = {
	readonly kind: 'tool';
	readonly toolUseId: string;
	readonly name: string;
	readonly subject: string;
	readonly input: string;
	result: string | null;
	isError: boolean;
};

type MutableEntry = ProseEntry | ThinkingEntry | MutableToolCallEntry;

export interface EntryFold {
	readonly entries: MutableEntry[];
	readonly results: Map<string, ToolResult>;
	// A tool use id can be emitted more than once, so a result answers every place it was emitted
	// rather than the last. One entry is the whole of it in every transcript seen, and a list costs
	// nothing where that holds.
	readonly toolAt: Map<string, number[]>;
}

export function emptyEntryFold(): EntryFold {
	return { entries: [], results: new Map(), toolAt: new Map() };
}

// WHAT A LINE DID, SO IT CAN BE UNDONE. A file caught between the write of a record and the write
// of its newline ends mid-line. A read of the whole file parses those bytes and almost always gets
// nothing, but "almost always" is not "always", and a reader that simply held them back would answer
// short of a read from the first byte in the one case that matters. The line is folded like any
// other and then taken back, so the committed fold never sees a record twice.
export interface FoldJournal {
	entriesWere: number;
	readonly resultsWere: [string, ToolResult | undefined][];
	readonly toolAtWere: [string, number[] | undefined][];
	readonly patched: [number, string | null, boolean][];
}

export function emptyJournal(): FoldJournal {
	return { entriesWere: -1, resultsWere: [], toolAtWere: [], patched: [] };
}

// Backwards, because one line may touch one key twice and the earliest note is the one that holds.
export function undoFold(fold: EntryFold, journal: FoldJournal): undefined {
	for (let at = journal.patched.length - 1; at >= 0; at -= 1) {
		const note = journal.patched[at];
		if (note === undefined) { continue; }
		const entry = fold.entries[note[0]];
		if (entry !== undefined && entry.kind === 'tool') { entry.result = note[1]; entry.isError = note[2]; }
	}
	for (let at = journal.toolAtWere.length - 1; at >= 0; at -= 1) {
		const note = journal.toolAtWere[at];
		if (note === undefined) { continue; }
		if (note[1] === undefined) { fold.toolAt.delete(note[0]); } else { fold.toolAt.set(note[0], note[1]); }
	}
	for (let at = journal.resultsWere.length - 1; at >= 0; at -= 1) {
		const note = journal.resultsWere[at];
		if (note === undefined) { continue; }
		if (note[1] === undefined) { fold.results.delete(note[0]); } else { fold.results.set(note[0], note[1]); }
	}
	if (journal.entriesWere >= 0) { fold.entries.length = journal.entriesWere; }
	return undefined;
}

export function foldEntryLine(fold: EntryFold, line: string, journal?: FoldJournal): undefined {
	const record = parseLine(line);
	if (record === null) { return undefined; }
	if (journal !== undefined && journal.entriesWere < 0) { journal.entriesWere = fold.entries.length; }

	// Results first, and from every record whatever its type, exactly as the collecting pass did.
	for (const block of blocksOf(record)) {
		if (block.type !== 'tool_result' || typeof block.tool_use_id !== 'string') { continue; }
		const result: ToolResult = { text: resultText(block.content), isError: block.is_error === true };
		journal?.resultsWere.push([block.tool_use_id, fold.results.get(block.tool_use_id)]);
		fold.results.set(block.tool_use_id, result);
		for (const at of fold.toolAt.get(block.tool_use_id) ?? []) {
			const entry = fold.entries[at];
			if (entry !== undefined && entry.kind === 'tool') {
				journal?.patched.push([at, entry.result, entry.isError]);
				entry.result = result.text;
				entry.isError = result.isError;
			}
		}
	}

	if (typeof record.type !== 'string' || !RENDERED_RECORD_TYPES.has(record.type)) { return undefined; }
	if (record.isMeta === true) { return undefined; }

	const kind = record.type === 'user' ? 'user' : 'assistant';
	const timestamp = typeof record.timestamp === 'string' ? record.timestamp : null;

	for (const block of blocksOf(record)) {
		if (block.type === 'text' && typeof block.text === 'string') {
			if (block.text.trim() === '') { continue; }
			fold.entries.push({ kind, text: block.text, timestamp });
		} else if (block.type === 'thinking' && typeof block.thinking === 'string') {
			if (block.thinking.trim() === '') { continue; }
			fold.entries.push({ kind: 'thinking', text: block.thinking });
		} else if (block.type === 'tool_use' && typeof block.id === 'string') {
			const name = typeof block.name === 'string' ? block.name : 'tool';
			const matched = fold.results.get(block.id);
			const at = fold.entries.length;
			fold.entries.push({
				kind: 'tool',
				toolUseId: block.id,
				name,
				subject: toolSubject(name, block.input),
				input: stringify(block.input),
				result: matched?.text ?? null,
				isError: matched?.isError ?? false,
			});
			const seen = fold.toolAt.get(block.id);
			// Copied, not held: the list is pushed to below, and a journal holding the same array
			// would restore it already mutated.
			journal?.toolAtWere.push([block.id, seen === undefined ? undefined : [...seen]]);
			if (seen === undefined) { fold.toolAt.set(block.id, [at]); } else { seen.push(at); }
		}
	}
	return undefined;
}

export function buildEntries(text: string): readonly Entry[] {
	const fold = emptyEntryFold();
	for (const line of text.split('\n')) { foldEntryLine(fold, line); }
	return fold.entries;
}
