/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * What this feature asks akasha, and how it reads the answer back.
 *
 * WHY A COMMAND RATHER THAN AN IMPORT. `pages/domain/agent-harness.domain.md` puts the answer in
 * the harness: what an agent row MEANS is settled there, and the command is the join. A command is
 * also re-read on every call, so a change to what this panel counts as a seat is live on the commit
 * that makes it rather than on a build.
 *
 *
 * WHY NO PACKAGE AT ALL, and zod in particular. The domain tree next door parses its verb's answer
 * with zod. What fills THIS panel is asked to stand on the harness alone, so the narrowing below
 * is written out rather than declared — twenty lines against a dependency on a checkout being
 * there.
 *
 * HOW IT REACHES `bun`. Through `harness-call`, which is where this extension decides what
 * environment a harness call runs in. This used to be a `/bin/bash -lc` wrapper with a comment
 * saying the login shell supplied `bun` and `DATABASE_URL`; it supplied neither, and that is what
 * left this panel empty on 2026-08-13. See that file for the measurement.
 */

import { runVerb, verbPath } from '../../harness-call.ts';

/**
 * The ceiling on one call. Past it the verb is stuck rather than slow, and a wait with no ceiling
 * reports neither an answer nor a failure.
 */
const VERB_TIMEOUT_MS = 30_000;

/** Room to grow into rather than a fit: the forest answer is a few kilobytes for today's fleet. */
const MAX_BUFFER = 8 * 1024 * 1024;

/**
 * What the verb answered, as a JSON value the caller narrows.
 *
 * IT THROWS RATHER THAN ANSWERING EMPTY. An empty answer is a claim — that the fleet holds no seats
 * — and nothing here is ever in a position to make it. The caller keeps the forest it last read on
 * screen and writes the reason to its output channel.
 */
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

/**
 * The same ask, naming a verb rather than handing over its path.
 *
 * SEPARATE FROM `askHarnessFile` because which checkout a verb's file stands in is `harness-call`'s
 * to settle. A caller that already holds a resolved path asks through `askHarnessFile` instead.
 */
export async function askHarness(verb: string, args: readonly string[] = []): Promise<unknown> {
	return askHarnessFile(verbPath(verb), args);
}

/**
 * One agent row as the harness answers it.
 *
 * The fields are spelled as the row spells them rather than as this panel reads them, because the
 * name a field has is the harness's to state and a second spelling on the way in would be this
 * extension quietly renaming somebody else's row.
 */
export interface HarnessRow {
	readonly id: string;
	readonly name: string | null;
	readonly parent_agent_id: string | null;
	readonly principal: string | null;
	/**
	 * A restatement of the principal: `opened` where the seat's page names a person, `spawned`
	 * where it names a parent seat, and null where it names neither. It says nothing about where
	 * the seat runs.
	 */
	readonly launch: string | null;
	/** Where the seat runs — `interactive` or `headless` — or null where its page states none. */
	readonly mode: string | null;
	/** Whether the row was in the live listing, as against an ancestor fetched back in. */
	readonly live: boolean;
	/** `working`, `waiting`, `stopped` or `unknown`, read off what the seat itself keeps. */
	readonly state: string | null;
	/** What a waiting seat waits on, and null for every other state. */
	readonly waitingOn: string | null;
	/** The colour the corpus draws that state in, named rather than specified. */
	readonly colour: string | null;
}

function stringOrNull(value: unknown, field: string, at: number): string | null {
	if (value === null || typeof value === 'string') { return value; }
	throw new Error(`agent-forest: rows[${at}].${field} is neither a string nor null`);
}

/**
 * The colour name on a row, read under whichever of the two spellings it arrived with.
 *
 * WHY THE ROW IS ASKED WHICH KEY IT CARRIES. `agent-forest` spells this field `colour` today and
 * will spell it `color`. A build Alan is running was compiled against whichever spelling stood when
 * it was built, so this has to take the new name BEFORE the verb starts sending it — reading only
 * the old one would make the renaming commit throw on every row, and this panel answers a throw by
 * keeping its last tree and writing a line to a channel nobody has open.
 *
 * A ROW CARRYING NEITHER IS STILL REFUSED, which is the reading that must not be lost. `undefined`
 * is not a colour and not an absence of one; a row that states no colour states `null`. Missing both
 * keys falls through to the old spelling and throws naming it, which is the shape a verb answering
 * something this was not written for actually has.
 *
 * THE ERROR NAMES THE KEY THAT WAS READ rather than a fixed one, so whoever opens the channel is
 * sent to the spelling actually on the wire.
 */
function rowColour(row: Record<string, unknown>, at: number): string | null {
	const field = Object.hasOwn(row, 'color') ? 'color' : 'colour';
	return stringOrNull(row[field], field, at);
}

/**
 * The rows the verb answered with, or a throw naming what could not be read.
 *
 * NARROWED RATHER THAN CAST, because this crosses a process boundary: a verb that changed
 * underneath this panel becomes a line in its output channel, where a cast would make it a tree
 * half-built out of `undefined` rows carrying no id.
 *
 * The VALUES are not re-narrowed here and must not be. The harness folds a field that is not a
 * string down to null before it answers, and a second reading of them here would be the second
 * place that answers what a row means.
 */
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

/**
 * The colour name the corpus draws one turn state in, or a throw naming what could not be read.
 *
 * ASKED BY STATE RATHER THAN BY AGENT ID, which is the only way this panel can colour a subagent
 * at all. A subagent's row is keyed on the `tool_use` id that launched it, because a SYNCHRONOUS
 * one has no agent id until it has finished — see `subagent-core.ts`, where a third of the
 * launches on this host are synchronous — so while the row is on screen there is no id to ask
 * under. What saves it is that every subagent on this tree is working: a returned one is dropped
 * before it gets here, and `pages/domain/subagent-turn.domain.md` says a subagent is working or stopped and
 * never anything between. One name therefore serves every subagent row, and which colour that
 * name is stays the corpus's to say.
 */
export function parseStateColour(answer: unknown, state: string): string {
	if (answer === null || typeof answer !== 'object') {
		throw new Error('agent-turn-colors: the answer is not an object, so it names no colour');
	}
	// `colors` first for the reason `rowColour` states: it is the spelling the command sends.
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
