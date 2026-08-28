import * as vscode from 'vscode';
import { z } from 'zod';
import { SEAT_MODE_SCHEMA } from '../../seat/mode.ts';
import { type AgentNode } from './forest.ts';
import { type SeatClick } from './tree.ts';
import { seatTabs } from './tree-state.ts';

const SEAT_CLICK_SCHEMA = z.looseObject({ id: z.string().min(1), name: z.string().min(1) });

export function parseSeatClick(clicked: unknown): SeatClick | undefined {
	const parsed = SEAT_CLICK_SCHEMA.safeParse(clicked);
	return parsed.success ? { id: parsed.data.id, name: parsed.data.name } : undefined;
}

const TOGGLE_TARGET_SCHEMA = z.object({
	id: z.string().min(1),
	name: z.string(),
	kind: z.literal('seat'),
	live: z.boolean(),
	place: SEAT_MODE_SCHEMA,
});
export type ToggleTarget = z.infer<typeof TOGGLE_TARGET_SCHEMA>;

export function asToggleTarget(value: unknown): ToggleTarget | undefined {
	const parsed = TOGGLE_TARGET_SCHEMA.safeParse(value);
	return parsed.success ? parsed.data : undefined;
}

const TERMINAL_SCHEME = 'vscode-terminal';

function seatForTab(value: unknown): AgentNode | undefined {
	if (!(value instanceof vscode.Uri) || value.scheme !== TERMINAL_SCHEME) { return undefined; }
	const last = value.path.split('/').at(-1);
	if (last === undefined) { return undefined; }
	const instanceId = Number(last);
	if (!Number.isInteger(instanceId)) { return undefined; }
	return seatTabs.get(instanceId);
}

export function invokedSeat(value: unknown): ToggleTarget | undefined {
	return asToggleTarget(seatForTab(value) ?? value);
}
