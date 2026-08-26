/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import type { SeatMode } from '../../seat/mode';
import type { SeatRow } from './forest';
import type { SubagentNode } from './subagents';

/** No seat is running a subagent — the ordinary case, and the one #18373 covered. */
export const NO_SUBAGENTS: ReadonlyMap<string, readonly SubagentNode[]> = new Map();

// Nobody stated a place. The caller resolves one for every row before this is
// reached, so an empty map is a seat the assembly was handed no reading for, which
// it answers with headless.
export const NO_PLACES: ReadonlyMap<string, SeatMode> = new Map();

export function row(
	id: string,
	name: string | null,
	parent: string | null,
	principal: string | null = null
): SeatRow {
	return { id, name, parent_agent_id: parent, principal, state: null, waitingOn: null, colour: null };
}

export function subagent(
	key: string,
	label: string,
	children: readonly SubagentNode[] = []
): SubagentNode {
	return { key, label, children };
}
