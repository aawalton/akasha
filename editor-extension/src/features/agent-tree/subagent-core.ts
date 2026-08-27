/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Which subagents a transcript shows as STILL RUNNING, as a pure fold over the
 * records of the seat's own transcript.
 *
 * READ IT FROM THE PARENT, NEVER FROM THE SUBAGENT'S OWN LAST RECORD. Measured
 * over 11,836 finished subagent transcripts on this host, 3,528 of them — very
 * nearly a third — end in a shape a reader would take for still-working: 1,759
 * on an assistant message whose `stop_reason` is null, 1,765 on a tool result,
 * and 4 on a tool call with nothing after it. Their bodies are plainly final
 * reports. A rule keyed on how the subagent's file ends would leave a third of
 * the dead in the tree.
 *
 * THE RULE IS LAST MENTION WINS, in file order. A launch or a resume makes an
 * entry running, a notification makes it stopped, and whichever came last
 * decides. That is what carries the resumed subagent with no case of its own:
 * its second launch simply sits after its first notification. Nothing caches a
 * subagent as gone for good — the notification's own note says the same id may
 * notify more than once, and 73 agent ids on this host have.
 */
import { z } from 'zod';

/** A subagent this transcript shows as running. */
export interface RunningSubagent {
	/**
	 * The row's identity, stable from launch to death. The `tool_use` id rather
	 * than the agent id, because a SYNCHRONOUS subagent has no agent id until it
	 * finishes — the id arrives on the result, and while one is running there is
	 * no result. Keying on the agent id would leave every running synchronous
	 * subagent off the tree, and a third of the launches here are synchronous.
	 */
	readonly key: string;
	/** Known once a result has landed; null while a synchronous subagent runs. */
	readonly agentId: string | null;
	readonly label: string;
}

/**
 * The fold's carried state. Held across polls rather than rebuilt, so a
 * transcript is read once and afterwards only where it grew — see `subagents.ts`.
 */
export interface SubagentState {
	readonly labels: Map<string, string>;
	/** Agent id to the `tool_use` id that launched it — how a notification lands. */
	readonly agentByTool: Map<string, string>;
	readonly running: Map<string, boolean>;
	/**
	 * The launches still owed a result, by `tool_use` id. Emptied by the next
	 * assistant record, which is what makes an abandoned launch fall out.
	 */
	readonly awaiting: Set<string>;
}

export function emptySubagentState(): SubagentState {
	return { labels: new Map(), agentByTool: new Map(), running: new Map(), awaiting: new Set() };
}

const AGENT_TOOL = 'Agent';

/**
 * A whole notification block, and the id inside it.
 *
 * THE BLOCK IS MATCHED BEFORE THE ID, and that is what keeps a transcript out of
 * its own mouth: a bare `<task-id>` search also hits any tool result that
 * happened to print one — a seat reading transcripts, which is what this
 * feature's own author spent the morning doing. The id must sit inside a
 * notification to count.
 */
const NOTIFICATION_BLOCK = /<task-notification>[\s\S]*?<\/task-notification>/g;
const TASK_ID = /<task-id>([^<]+)<\/task-id>/g;

/**
 * A STOP, WHICH IS NOT ANNOUNCED. Stopping a subagent writes nothing against the
 * launch it ends: the refusal lands on whatever call next reached for the agent —
 * a `SendMessage` trying to revive one — under THAT call's `tool_use` id, which
 * this fold never saw running. So neither the result branch nor the notification
 * branch touches the row, and it stands as working for as long as the seat lives.
 *
 * The agent id inside the message is the only handle back to the row.
 */
const STOPPED_BY_USER = /\bAgent ([A-Za-z0-9]+) was stopped by the user\b/;

type Json = Record<string, unknown>;

/**
 * A JSON object rather than an array or a scalar. Exported because the reader
 * parses each transcript line through it, and a second spelling of "is this a
 * record" could admit a shape this fold then walks as though it were one.
 */
export function isJsonObject(value: unknown): value is Json {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** The whole notification blocks in a piece of text, or none. */
const NOTIFICATION_BLOCKS = z.array(z.string());

/** A capture of one id: the whole match, then the id. */
const ID_MATCH = z.array(z.string()).min(2);

function asObject(value: unknown): Json | null {
	return isJsonObject(value) ? value : null;
}

function asArray(value: unknown): readonly unknown[] {
	return Array.isArray(value) ? value : [];
}

function asString(value: unknown): string | null {
	return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * The text a notification could be carried in, for records that carry one.
 *
 * ONE LOGICAL NOTIFICATION IS WRITTEN TWO TO FOUR TIMES, in different record
 * shapes — a `queue-operation` enqueue, a `queued_command` attachment, a
 * `queue-operation` remove, and a plain user message. They are NOT deduped here
 * and need not be: marking an entry stopped is idempotent, and the copies land
 * at one moment, so no ordering among them changes the fold.
 *
 * A RECORD CARRYING A TOOL RESULT IS EXCLUDED. That is where a transcript this
 * seat itself read would appear, notification text and all.
 */
function notificationText(record: Json): string {
	if (record.toolUseResult !== undefined) { return ''; }
	const message = asObject(record.message);
	const content = message?.content;
	if (asArray(content).some((block) => asObject(block)?.type === 'tool_result')) { return ''; }

	const parts: string[] = [];
	if (typeof content === 'string') { parts.push(content); }
	for (const block of asArray(content)) {
		const b = asObject(block);
		if (b !== null && b.type === 'text' && typeof b.text === 'string') { parts.push(b.text); }
	}
	const attachment = asObject(record.attachment);
	const prompt = attachment === null ? null : asString(attachment.prompt);
	if (prompt !== null) { parts.push(prompt); }
	const own = asString(record.content);
	if (own !== null) { parts.push(own); }
	return parts.join('\n');
}

/**
 * Fold one record into the state.
 *
 * Exported for the incremental reader, which applies it to the lines a
 * transcript grew by rather than to the whole file.
 */
export function applyRecord(state: SubagentState, record: Json): undefined {
	const message = asObject(record.message);

	// AN ABANDONED LAUNCH, and the one ending that carries no id to key on. A model
	// cannot write a second assistant message while a call from the first is still
	// outstanding, so a launch sitting behind a later assistant record was cut off
	// — the seat restarted mid-turn — and nothing will ever answer it.
	//
	// This clears BEFORE the launches on this record are added, so a call is never
	// abandoned by the message that made it. Neither working shape is touched: an
	// async launch is answered inside its own turn, and a synchronous one is the
	// last thing the parent wrote until it returns.
	// EVERY BACKGROUND SUBAGENT AT ONCE, NAMED BY NONE OF THEM. Killing a seat's
	// background agents writes one system record for the whole session and nothing
	// against the launches it ends, so without this every row it killed reads as
	// working for as long as the seat lives. It names no ids, which is why this
	// clears the map rather than a row.
	if (record.type === 'system' && record.subtype === 'agents_killed') {
		for (const toolUseId of state.running.keys()) { state.running.set(toolUseId, false); }
		state.awaiting.clear();
	}

	if (record.type === 'assistant') {
		for (const toolUseId of state.awaiting) { state.running.set(toolUseId, false); }
		state.awaiting.clear();
	}

	// A launch. Running from this moment whether it turns out to be synchronous or
	// backgrounded — the two part on the result, and until one lands the subagent
	// is working either way.
	for (const block of asArray(message?.content)) {
		const b = asObject(block);
		if (b === null || b.type !== 'tool_use' || b.name !== AGENT_TOOL) { continue; }
		const toolUseId = asString(b.id);
		if (toolUseId === null) { continue; }
		const input = asObject(b.input) ?? {};
		state.labels.set(
			toolUseId,
			asString(input.description) ?? asString(input.subagent_type) ?? 'subagent'
		);
		state.running.set(toolUseId, true);
		state.awaiting.add(toolUseId);
	}

	// A result. `toolUseResult` sits on the RECORD beside `message` rather than
	// inside the `tool_result` block, and it is the structured payload — the
	// block's own content is prose written for the model.
	const result = asObject(record.toolUseResult);
	for (const block of asArray(message?.content)) {
		const b = asObject(block);
		if (b === null || b.type !== 'tool_result') { continue; }
		const toolUseId = asString(b.tool_use_id);
		if (toolUseId === null) { continue; }
		state.awaiting.delete(toolUseId);

		if (result === null) {
			// A rejected or malformed result is an ending rather than a launch.
			// `toolUseResult` is the bare string "User rejected tool use" in 55
			// records here, which `asObject` answers null for.
			if (state.running.has(toolUseId)) { state.running.set(toolUseId, false); }
			continue;
		}

		if (state.running.has(toolUseId)) {
			const agentId = asString(result.agentId);
			if (agentId !== null) { state.agentByTool.set(agentId, toolUseId); }
			// `async_launched` carries `isAsync` and the subagent works on past it.
			// `completed` is the SYNCHRONOUS shape and has already returned by the
			// time it is written, so it ends the row rather than starting one.
			state.running.set(toolUseId, result.isAsync === true);
		}

		// A resume, which is what makes the fifth criterion fall out of the same
		// rule rather than needing one of its own. `SendMessage` answers
		// `resumedAgentId` where it revived a stopped subagent — a different key
		// from the launch's `agentId`, and the only signal that one came back.
		const resumed = asString(result.resumedAgentId);
		if (resumed !== null && result.success === true) {
			const known = state.agentByTool.get(resumed);
			if (known !== undefined) {
				state.running.set(known, true);
			} else {
				// Revived across a session boundary, so the launch sits in a transcript
				// this fold never saw. The agent id stands in as the row's identity,
				// which is the only handle there is.
				state.agentByTool.set(resumed, resumed);
				if (!state.labels.has(resumed)) { state.labels.set(resumed, resumed); }
				state.running.set(resumed, true);
			}
		}

		// A stop. It reaches this fold as a FAILED CALL rather than a notification,
		// so it is read off the message on a result whose own row is not ours.
		//
		// THREE THINGS MUST HOLD TOGETHER, and the third is what keeps a transcript
		// out of its own mouth: a seat reading transcripts prints this very sentence
		// into tool results, which is how the notification path was got wrong once
		// already. Such a result carries `stdout` rather than `success` and
		// `message`, and names an id the reading seat never launched.
		if (result.success === false) {
			const stopped = ID_MATCH.safeParse(STOPPED_BY_USER.exec(asString(result.message) ?? ''));
			const id = stopped.success ? stopped.data[1] : undefined;
			const row = id === undefined ? undefined : state.agentByTool.get(id);
			if (row !== undefined) { state.running.set(row, false); }
		}
	}

	// A stop. THE ID IS NOT ALWAYS A SUBAGENT'S: background shell tasks and
	// Monitors announce themselves through this same channel and account for 4,073
	// of the 8,357 notifications on this host. An id this fold never saw launched
	// is not ours, which is what consulting `agentByTool` settles.
	const text = notificationText(record);
	if (text.length === 0) { return undefined; }
	const blocks = NOTIFICATION_BLOCKS.safeParse(text.match(NOTIFICATION_BLOCK));
	if (!blocks.success) { return undefined; }
	for (const blockText of blocks.data) {
		// EVERY ID IN THE BLOCK, NOT JUST THE FIRST. The sweep a seat writes when it
		// restarts names every subagent it could not account for in ONE notification —
		// six of them in the widest case here — and that sweep is the only record that
		// ever clears a subagent left over from a previous session. Reading one id left
		// every other one running for as long as the window lived.
		for (const found of blockText.matchAll(TASK_ID)) {
			const match = ID_MATCH.safeParse(found);
			if (!match.success) { continue; }
			const id = match.data[1];
			if (id === undefined) { continue; }
			const toolUseId = state.agentByTool.get(id);
			if (toolUseId !== undefined) { state.running.set(toolUseId, false); }
		}
	}
	return undefined;
}

/** The subagents standing as running, in a stable order. */
export function runningSubagents(state: SubagentState): readonly RunningSubagent[] {
	const agentByToolUseId = new Map<string, string>();
	for (const [agentId, toolUseId] of state.agentByTool) { agentByToolUseId.set(toolUseId, agentId); }

	const out: RunningSubagent[] = [];
	for (const [key, isRunning] of state.running) {
		if (!isRunning) { continue; }
		out.push({
			key,
			agentId: agentByToolUseId.get(key) ?? null,
			label: state.labels.get(key) ?? key,
		});
	}
	// Sorted on what the row shows and then on the key, so a refresh never
	// reshuffles rows under the pointer and two subagents sharing a description
	// still hold a fixed order between them.
	return out.sort((a, b) => a.label.localeCompare(b.label) || a.key.localeCompare(b.key));
}
