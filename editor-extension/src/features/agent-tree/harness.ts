import { runVerb, verbPath } from '../../harness-call.ts';

const VERB_TIMEOUT_MS = 30_000;

const MAX_BUFFER = 8 * 1024 * 1024;

export async function askHarnessFile(file: string, args: readonly string[] = []): Promise<unknown> {
	const stdout = await runVerb(file, args, {
		timeout: VERB_TIMEOUT_MS,
		maxBuffer: MAX_BUFFER,
	});
	try {
		return JSON.parse(stdout) as unknown;
	} catch (err) {
		throw new Error(`${file} did not print JSON: ${String(err)}`);
	}
}

export async function askHarness(verb: string, args: readonly string[] = []): Promise<unknown> {
	return askHarnessFile(verbPath(verb), args);
}

export interface HarnessRow {
	readonly id: string;
	readonly name: string | null;
	readonly parent_agent_id: string | null;
	readonly principal: string | null;
	readonly launch: string | null;
	readonly mode: string | null;
	readonly live: boolean;
	readonly state: string | null;
	readonly waitingOn: string | null;
	readonly colour: string | null;
	// Where this seat's page stands inside the repository the answer names, or null where akasha
	// holds none standing. Null is the whole of what a row with no page carries: nothing here
	// composes a path for one, because a path composed rather than answered is a path that opens
	// whatever has since been filed under it.
	readonly at: string | null;
}

// One subagent page akasha holds, keyed by the seat that ran the subagent and the id the subagent
// runs under. Which subagents are RUNNING is read from the seats' transcripts and never from here;
// these are the pages, to be joined against the running ones on those two keys.
export interface SubagentPage {
	readonly seat: string;
	readonly own: string;
	readonly at: string;
}

export interface ForestAnswer {
	// The akasha checkout every `at` was resolved against, or null where the verb named none. A
	// reading with no repo carries no absolute path for anything, so every row draws without a
	// document rather than against a root guessed at here.
	readonly repo: string | null;
	readonly rows: readonly HarnessRow[];
	readonly subagentPages: readonly SubagentPage[];
}

function stringOrNull(value: unknown, field: string, at: number): string | null {
	if (value === null || typeof value === 'string') { return value; }
	throw new Error(`agent-forest: rows[${at}].${field} is neither a string nor null`);
}

function rowColour(row: Record<string, unknown>, at: number): string | null {
	const field = Object.hasOwn(row, 'color') ? 'color' : 'colour';
	return stringOrNull(row[field], field, at);
}

export function parseForestRows(answer: unknown): readonly HarnessRow[] {
	if (answer === null || typeof answer !== 'object' || !Array.isArray((answer as { rows?: unknown }).rows)) {
		throw new Error('agent-forest: the answer carries no `rows` array, so it names no seat at all');
	}
	return (answer as { rows: readonly unknown[] }).rows.map((raw, at) => {
		if (raw === null || typeof raw !== 'object') {
			throw new Error(`agent-forest: rows[${at}] is not an object`);
		}
		const row = raw as Record<string, unknown>;
		if (typeof row.id !== 'string' || row.id === '') {
			throw new Error(`agent-forest: rows[${at}] carries no id, and a row with none is no seat`);
		}
		if (typeof row.live !== 'boolean') {
			throw new Error(`agent-forest: rows[${at}].live is not a boolean`);
		}
		return {
			id: row.id,
			name: stringOrNull(row.name, 'name', at),
			parent_agent_id: stringOrNull(row.parent_agent_id, 'parent_agent_id', at),
			principal: stringOrNull(row.principal, 'principal', at),
			launch: stringOrNull(row.launch, 'launch', at),
			mode: stringOrNull(row.mode, 'mode', at),
			live: row.live,
			state: stringOrNull(row.state, 'state', at),
			waitingOn: stringOrNull(row.waitingOn, 'waitingOn', at),
			colour: rowColour(row, at),
			at: stringOrNull(row.at ?? null, 'at', at),
		};
	});
}

function textIn(held: Record<string, unknown>, key: string): string | null {
	const value = held[key];
	return typeof value === 'string' && value !== '' ? value : null;
}

// A page whose seat, id or path is missing or blank is dropped rather than kept half-keyed: it
// could only ever be joined to a row by guessing at what it is missing, and a guess here is a row
// opening another subagent's page.
export function parseSubagentPages(answer: unknown): readonly SubagentPage[] {
	if (answer === null || typeof answer !== 'object') { return []; }
	const held = (answer as { subagents?: unknown }).subagents;
	if (!Array.isArray(held)) { return []; }
	const found: SubagentPage[] = [];
	for (const raw of held) {
		if (raw === null || typeof raw !== 'object') { continue; }
		const one = raw as Record<string, unknown>;
		const seat = textIn(one, 'seat');
		const own = textIn(one, 'own');
		const at = textIn(one, 'at');
		if (seat === null || own === null || at === null) { continue; }
		found.push({ seat, own, at });
	}
	return found;
}

export function parseForest(answer: unknown): ForestAnswer {
	const rows = parseForestRows(answer);
	const held = answer as Record<string, unknown>;
	const repo = textIn(held, 'repo');
	return {
		repo,
		rows,
		// Without a repo there is nothing to join a relative path against, so the pages are dropped
		// rather than carried as paths that would be opened relative to whatever the editor's own
		// working directory happens to be.
		subagentPages: repo === null ? [] : parseSubagentPages(answer),
	};
}

export function parseStateColour(answer: unknown, state: string): string {
	if (answer === null || typeof answer !== 'object') {
		throw new Error('agent-turn-colors: the answer is not an object, so it names no colour');
	}
	const held = answer as { colors?: unknown; colours?: unknown };
	const colours = held.colors ?? held.colours;
	if (colours === null || colours === undefined || typeof colours !== 'object') {
		throw new Error('agent-turn-colors: the answer carries neither a `colors` nor a `colours` record');
	}
	const named = (colours as Record<string, unknown>)[state];
	if (typeof named !== 'string' || named === '') {
		throw new Error(`agent-turn-colors: nothing was answered for the \`${state}\` state`);
	}
	return named;
}
