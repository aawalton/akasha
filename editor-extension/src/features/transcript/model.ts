/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Turning a Claude Code session transcript into something a person reads.
 *
 * The file is a JSONL of ~14 record types, measured on a real 16,684-record
 * transcript. Two of them — `user` and `assistant` — are the conversation. The
 * other twelve (`attachment`, `system`, `bridge-session`, `last-prompt`,
 * `permission-mode`, `mode`, `custom-title`, `ai-title`, `agent-name`,
 * `file-history-snapshot`, `queue-operation`, `file-history-delta`) are
 * machinery.
 *
 * Machinery is dropped by ALLOWLIST rather than by blocklist. Naming the twelve
 * to exclude would render any thirteenth type Anthropic adds, which surfaces as
 * junk in the reader with nothing to explain it. Keeping only the two we can
 * render means a new type stays invisible until somebody decides its shape.
 */
import { z } from 'zod';

/** A tool call, paired with the result that answered it. */
export interface ToolCallEntry {
	readonly kind: 'tool';
	readonly toolUseId: string;
	readonly name: string;
	/**
	 * The one line standing in for the call before anyone opens it. 82% of calls
	 * in the sampled transcript were `Bash`, so a row reading only the tool name
	 * gives a wall of identical lines; the subject is what makes the collapsed
	 * list scannable, and it is per-tool because the interesting field differs.
	 */
	readonly subject: string;
	readonly input: string;
	/** Null where the call never returned — a seat killed mid-call. */
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

/**
 * The transcript's shapes, parsed rather than asserted.
 *
 * Every schema here is LOOSE, and that is the point: the file is written by
 * another program that adds fields on its own schedule, so a strict shape would
 * reject whole records over a key we never read. Loose parsing takes what we
 * name, keeps what we do not, and rejects only what is genuinely the wrong kind.
 */
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

/** A tool's input, as far as we read it: named fields looked up by key. */
const toolInputSchema = z.record(z.string(), z.unknown());

/** Content is either one string or a list of blocks, in the same file. */
const messageContentSchema = z.union([z.string(), z.array(rawBlockSchema)]);

/**
 * The field standing in for each tool's subject. Ordered per tool because the
 * useful field differs: a `Bash` row wants its command, a `Read` row its path.
 * A tool absent here falls back to the first string field of its input, which
 * keeps a new tool readable without a code change.
 */
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

/** A subject is one line: a newline inside a heredoc must not break the row. */
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
	// A call whose input carries no text at all — a numeric or boolean option and
	// nothing else. Found on a real transcript: a snapshot call taking only
	// `depth`. The key with its value still identifies the call, where an empty
	// subject leaves the bare tool name repeated down the list.
	for (const [key, value] of Object.entries(record)) {
		if (typeof value === 'number' || typeof value === 'boolean') {
			return firstLine(`${key}=${String(value)}`);
		}
	}
	return '';
}

/**
 * A `tool_result`'s content is either a plain string or an array of blocks.
 * Both shapes occur in the same file, so a reader handling one silently renders
 * half the results blank.
 */
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
		// A half-written final line is normal while a seat runs: the writer appends
		// and we may read mid-append. The next poll gets it whole.
		return null;
	}
}

function blocksOf(record: RawRecord): readonly RawBlock[] {
	const parsed = messageContentSchema.safeParse(record.message?.content);
	if (!parsed.success) { return []; }
	if (typeof parsed.data === 'string') { return [{ type: 'text', text: parsed.data }]; }
	return parsed.data;
}

/**
 * The render model for a transcript.
 *
 * Results are matched to calls by `tool_use_id` across records, because the
 * result arrives in a LATER `user` record than the `tool_use` asking for it.
 * That is also why an unmatched call is legal rather than a parse failure: a
 * seat killed mid-call leaves a real call with no result, and showing it
 * pending is more honest than dropping it.
 */
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
		// `isMeta` marks a turn the harness injected rather than one anybody wrote.
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
			// A `tool_result` block contributes no entry: it was folded into its call
			// above. Rendering it separately is what produces the "user turn that is
			// a wall of command output" the first criterion rules out.
		}
	}
	return entries;
}
