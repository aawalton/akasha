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
		};
	});
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
