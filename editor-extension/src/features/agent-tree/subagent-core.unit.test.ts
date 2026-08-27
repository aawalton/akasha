/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import { applyRecord, emptySubagentState, runningSubagents } from './subagent-core';

/**
 * The record shapes below are the ones these transcripts actually write, taken from
 * real transcripts on this host rather than invented. The two that matter most
 * are the two `Agent` results: `async_launched` carries `isAsync` and the
 * subagent works on past it, where `completed` is the synchronous shape and has
 * already returned by the time it is written.
 */
function launch(toolUseId: string, description: string): Record<string, unknown> {
	return {
		type: 'assistant',
		message: {
			content: [
				{
					type: 'tool_use',
					id: toolUseId,
					name: 'Agent',
					input: { description, prompt: '…', subagent_type: 'general-purpose' },
				},
			],
		},
	};
}

function asyncResult(toolUseId: string, agentId: string): Record<string, unknown> {
	return {
		type: 'user',
		message: { content: [{ type: 'tool_result', tool_use_id: toolUseId }] },
		toolUseResult: {
			isAsync: true,
			status: 'async_launched',
			agentId,
			description: '…',
			outputFile: '/tmp/x.output',
		},
	};
}

function syncResult(toolUseId: string, agentId: string): Record<string, unknown> {
	return {
		type: 'user',
		message: { content: [{ type: 'tool_result', tool_use_id: toolUseId }] },
		toolUseResult: { status: 'completed', agentId, agentType: 'Explore', content: [] },
	};
}

function notification(agentId: string, status: string): Record<string, unknown> {
	return {
		type: 'user',
		message: {
			content: `<task-notification>\n<task-id>${agentId}</task-id>\n<status>${status}</status>\n<summary>Agent "x" finished</summary>\n</task-notification>`,
		},
	};
}

function resume(toolUseId: string, agentId: string): Record<string, unknown> {
	return {
		type: 'user',
		message: { content: [{ type: 'tool_result', tool_use_id: toolUseId }] },
		toolUseResult: {
			success: true,
			message: `Agent "${agentId}" had no active task; resumed from transcript in the background`,
			resumedAgentId: agentId,
			pin: { id: agentId, name: agentId, ref: '18d10d' },
		},
	};
}

/**
 * The shape a stop actually leaves behind, taken from a transcript on this host:
 * a refusal on the call that reached for the agent afterwards, never a record
 * against the launch it ended.
 */
function stopRefusal(toolUseId: string, agentId: string): Record<string, unknown> {
	return {
		type: 'user',
		message: { content: [{ type: 'tool_result', tool_use_id: toolUseId }] },
		toolUseResult: {
			success: false,
			message: `Agent ${agentId} was stopped by the user and won't be resumed. Treat its work as cancelled; only launch a new agent if the user explicitly asks.`,
		},
	};
}

/** An assistant record carrying no call — what a turn after an interruption looks like. */
function assistantText(text: string): Record<string, unknown> {
	return { type: 'assistant', message: { content: [{ type: 'text', text }] } };
}

/** Two subagents dispatched together, which is one assistant record rather than two. */
function launchPair(
	first: readonly [string, string],
	second: readonly [string, string]
): Record<string, unknown> {
	return {
		type: 'assistant',
		message: {
			content: [first, second].map(([toolUseId, description]) => ({
				type: 'tool_use',
				id: toolUseId,
				name: 'Agent',
				input: { description, prompt: '…', subagent_type: 'general-purpose' },
			})),
		},
	};
}

function fold(records: readonly Record<string, unknown>[]) {
	const state = emptySubagentState();
	for (const record of records) { applyRecord(state, record); }
	return runningSubagents(state);
}

function labels(records: readonly Record<string, unknown>[]): readonly string[] {
	return fold(records).map((s) => s.label);
}

describe('running subagents', () => {
	test('a backgrounded subagent runs from its launch', () => {
		expect(labels([launch('t1', 'Survey'), asyncResult('t1', 'a1')])).toEqual(['Survey']);
	});

	// The whole of the fourth criterion. Whichever way it ended, the row goes.
	for (const status of ['completed', 'failed', 'killed', 'stopped']) {
		test(`a subagent that ${status} leaves the tree`, () => {
			expect(
				labels([launch('t1', 'Survey'), asyncResult('t1', 'a1'), notification('a1', status)])
			).toEqual([]);
		});
	}

	// A synchronous subagent has no agent id until it finishes, so a rule keyed on
	// the agent id would never show one while it was working — and a third of the
	// launches on this host are synchronous.
	test('a synchronous subagent runs while its call has no result', () => {
		expect(labels([launch('t1', 'Blocking survey')])).toEqual(['Blocking survey']);
	});

	test('a synchronous subagent leaves the tree on its own result', () => {
		expect(labels([launch('t1', 'Blocking survey'), syncResult('t1', 'a1')])).toEqual([]);
	});

	// The fifth criterion, and it falls out of last-mention-wins rather than out of
	// a case of its own: the resume simply sits after the notification.
	test('a subagent resumed after stopping comes back', () => {
		expect(
			labels([
				launch('t1', 'Survey'),
				asyncResult('t1', 'a1'),
				notification('a1', 'completed'),
				resume('t2', 'a1'),
			])
		).toEqual(['Survey']);
	});

	test('a subagent resumed and then stopped again is gone again', () => {
		expect(
			labels([
				launch('t1', 'Survey'),
				asyncResult('t1', 'a1'),
				notification('a1', 'completed'),
				resume('t2', 'a1'),
				notification('a1', 'completed'),
			])
		).toEqual([]);
	});

	// A resume keeps the row it had rather than opening a second one beside it.
	test('a resumed subagent holds one row, not two', () => {
		expect(
			fold([
				launch('t1', 'Survey'),
				asyncResult('t1', 'a1'),
				notification('a1', 'completed'),
				resume('t2', 'a1'),
			]).map((s) => s.key)
		).toEqual(['t1']);
	});

	// Background shell tasks and Monitors announce themselves through this same
	// channel and are about half the notifications here. An id nothing launched as a
	// subagent is not one, and must not silently clear a row that is.
	test('a notification for a task that is not a subagent clears nothing', () => {
		expect(
			labels([launch('t1', 'Survey'), asyncResult('t1', 'a1'), notification('b43q7rv0g', 'failed')])
		).toEqual(['Survey']);
	});

	// One logical notification is written two to four times in different record
	// shapes. Marking a row stopped is idempotent, which is why they are not deduped.
	test('the same notification arriving in several record shapes is one ending', () => {
		const payload = '<task-notification>\n<task-id>a1</task-id>\n<status>completed</status>\n</task-notification>';
		expect(
			labels([
				launch('t1', 'Survey'),
				asyncResult('t1', 'a1'),
				{ type: 'queue-operation', operation: 'enqueue', content: payload },
				{ type: 'attachment', attachment: { type: 'queued_command', prompt: payload } },
				{ type: 'queue-operation', operation: 'remove', content: payload },
			])
		).toEqual([]);
	});

	// The hazard this feature's own author walked into: a seat reading transcripts
	// prints notification text into a tool result, which a bare `<task-id>` search
	// would read as its own subagents dying.
	test('notification text inside a tool result kills nothing', () => {
		const payload = '<task-notification>\n<task-id>a1</task-id>\n<status>completed</status>\n</task-notification>';
		expect(
			labels([
				launch('t1', 'Survey'),
				asyncResult('t1', 'a1'),
				{
					type: 'user',
					message: { content: [{ type: 'tool_result', tool_use_id: 'bash-1' }] },
					toolUseResult: { stdout: payload },
				},
			])
		).toEqual(['Survey']);
	});

	// A stopped subagent is announced to nobody: the launch's own row never hears
	// of it, and without this the row stands as working until the seat itself dies.
	test('a subagent stopped by the user leaves the tree', () => {
		expect(
			labels([launch('t1', 'Survey'), asyncResult('t1', 'a1'), stopRefusal('t2', 'a1')])
		).toEqual([]);
	});

	// The same guard the notification path carries, for the same reason: an id this
	// fold never saw launched is not ours to clear.
	test('a stop naming an agent nothing launched clears nothing', () => {
		expect(
			labels([launch('t1', 'Survey'), asyncResult('t1', 'a1'), stopRefusal('t2', 'a9')])
		).toEqual(['Survey']);
	});

	// The hazard the notification path was got wrong on once. A seat reading
	// transcripts prints this sentence into a tool result, naming ids it launched.
	test('stop text inside an ordinary tool result kills nothing', () => {
		expect(
			labels([
				launch('t1', 'Survey'),
				asyncResult('t1', 'a1'),
				{
					type: 'user',
					message: { content: [{ type: 'tool_result', tool_use_id: 'bash-1' }] },
					toolUseResult: { stdout: 'Agent a1 was stopped by the user and won\'t be resumed.' },
				},
			])
		).toEqual(['Survey']);
	});

	// A stop is not the end of the id: 73 agent ids on this host have notified more
	// than once, and last mention wins.
	test('a subagent relaunched after a stop comes back', () => {
		expect(
			labels([
				launch('t1', 'Survey'),
				asyncResult('t1', 'a1'),
				stopRefusal('t2', 'a1'),
				resume('t3', 'a1'),
			])
		).toEqual(['Survey']);
	});

	// A seat restarted mid-turn leaves the launch with no result and no
	// notification — the only ending with no id to key on. Without this the row
	// stands as working for as long as the seat lives.
	test('a launch left behind by an interrupted turn leaves the tree', () => {
		expect(
			labels([launch('t1', 'Survey'), assistantText('Picking this back up.')])
		).toEqual([]);
	});

	// The shape that must NOT be swept up with it: the result came inside the turn,
	// so the row is answered for and the subagent works on past it.
	test('a backgrounded subagent survives the turns that follow it', () => {
		expect(
			labels([launch('t1', 'Survey'), asyncResult('t1', 'a1'), assistantText('Meanwhile…')])
		).toEqual(['Survey']);
	});

	test('a rejected call is an ending rather than a subagent left running', () => {
		expect(
			labels([
				launch('t1', 'Survey'),
				{
					type: 'user',
					message: { content: [{ type: 'tool_result', tool_use_id: 't1' }] },
					toolUseResult: 'User rejected tool use',
				},
			])
		).toEqual([]);
	});

	// Nothing on the tree may render as an empty row, which cannot be told from a
	// rendering fault.
	test('a call with no description falls back to a label rather than an empty one', () => {
		const bare = {
			type: 'assistant',
			message: {
				content: [
					{ type: 'tool_use', id: 't1', name: 'Agent', input: { subagent_type: 'Explore' } },
				],
			},
		};
		expect(labels([bare])).toEqual(['Explore']);
	});

	// The rows arrive as the transcript grew, so their order moves as subagents
	// start and stop. If that reached the view a refresh would reshuffle them.
	test('orders subagents by what the row shows rather than by launch order', () => {
		expect(labels([launchPair(['t1', 'zeta'], ['t2', 'alpha'])])).toEqual(['alpha', 'zeta']);
	});

	// The other tool this transcript carries. Only `Agent` launches a subagent.
	test('ignores a tool call that is not an Agent call', () => {
		const bash = {
			type: 'assistant',
			message: {
				content: [{ type: 'tool_use', id: 't9', name: 'Bash', input: { command: 'ls' } }],
			},
		};
		expect(labels([bash])).toEqual([]);
	});

	// The sweep a seat writes when it restarts names every subagent it could not
	// account for in ONE notification, and it is the only record that ever clears one
	// left over from a previous session. Reading only the first id left the rest on
	// the tree for as long as the window lived.
	test('a notification naming several agents clears every one of them', () => {
		const sweep = {
			type: 'user',
			message: { content: '<task-notification>\n<task-id>a1</task-id>\n<task-id>a2</task-id>\n<status>stopped</status>\n<summary>No completion record was found for 2 background agents from the previous session</summary>\n</task-notification>' },
		};
		expect(
			labels([
				launch('t1', 'Survey'),
				asyncResult('t1', 'a1'),
				launch('t2', 'Sweep'),
				asyncResult('t2', 'a2'),
				sweep,
			])
		).toEqual([]);
	});

	// A kill writes one record for the whole session and nothing against the launches
	// it ends, so every row it killed would otherwise read as working for as long as
	// the seat lived.
	test('killing every background agent of a session empties the tree', () => {
		expect(
			labels([
				launch('t1', 'Survey'),
				asyncResult('t1', 'a1'),
				launch('t2', 'Sweep'),
				asyncResult('t2', 'a2'),
				{ type: 'system', subtype: 'agents_killed' },
			])
		).toEqual([]);
	});
});
