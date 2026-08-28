import { describe, expect, test } from 'bun:test';
import { applyRecord, emptySubagentState, runningSubagents } from './subagent-core.ts';

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

function assistantText(text: string): Record<string, unknown> {
	return { type: 'assistant', message: { content: [{ type: 'text', text }] } };
}

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

	for (const status of ['completed', 'failed', 'killed', 'stopped']) {
		test(`a subagent that ${status} leaves the tree`, () => {
			expect(
				labels([launch('t1', 'Survey'), asyncResult('t1', 'a1'), notification('a1', status)])
			).toEqual([]);
		});
	}

	test('a synchronous subagent runs while its call has no result', () => {
		expect(labels([launch('t1', 'Blocking survey')])).toEqual(['Blocking survey']);
	});

	test('a synchronous subagent leaves the tree on its own result', () => {
		expect(labels([launch('t1', 'Blocking survey'), syncResult('t1', 'a1')])).toEqual([]);
	});

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

	test('a notification for a task that is not a subagent clears nothing', () => {
		expect(
			labels([launch('t1', 'Survey'), asyncResult('t1', 'a1'), notification('b43q7rv0g', 'failed')])
		).toEqual(['Survey']);
	});

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

	test('a subagent stopped by the user leaves the tree', () => {
		expect(
			labels([launch('t1', 'Survey'), asyncResult('t1', 'a1'), stopRefusal('t2', 'a1')])
		).toEqual([]);
	});

	test('a stop naming an agent nothing launched clears nothing', () => {
		expect(
			labels([launch('t1', 'Survey'), asyncResult('t1', 'a1'), stopRefusal('t2', 'a9')])
		).toEqual(['Survey']);
	});

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

	test('a launch left behind by an interrupted turn leaves the tree', () => {
		expect(
			labels([launch('t1', 'Survey'), assistantText('Picking this back up.')])
		).toEqual([]);
	});

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

	test('orders subagents by what the row shows rather than by launch order', () => {
		expect(labels([launchPair(['t1', 'zeta'], ['t2', 'alpha'])])).toEqual(['alpha', 'zeta']);
	});

	test('ignores a tool call that is not an Agent call', () => {
		const bash = {
			type: 'assistant',
			message: {
				content: [{ type: 'tool_use', id: 't9', name: 'Bash', input: { command: 'ls' } }],
			},
		};
		expect(labels([bash])).toEqual([]);
	});

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
