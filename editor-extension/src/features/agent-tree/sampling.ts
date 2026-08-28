import { recordObservation, recordSweep } from '../../seat/observation-store.ts';
import { PROCESS_ID_TIMEOUT_MS } from '../../seat/terminal-pids.ts';
import { readSeatLookup, readSeatTerminals, type SeatTerminal } from './columns.ts';
import type { AgentNode } from './forest.ts';
import { columns, output } from './tree-state.ts';


export function countRows(nodes: readonly AgentNode[]): number {
	let total = 0;
	for (const node of nodes) { total += 1 + countRows(node.children); }
	return total;
}

export async function sampleColumns(
	trigger: string,
	feature: string
): Promise<readonly SeatTerminal[] | undefined> {
	const { seatNames, psRows, tmuxClients } = await readSeatLookup();
	if (psRows.length === 0) { return undefined; }
	const { seats, sweep, counted, ms } = await readSeatTerminals(seatNames, psRows, tmuxClients);
	columns.record(seats);
	const placed = seats.filter((s) => s.column !== undefined).length;
	recordSweep(feature, { ...counted, boundMs: PROCESS_ID_TIMEOUT_MS, ms, trigger });
	recordObservation(feature, { counts: { seatTerminals: seats.length, placed } });
	output.appendLine(`[${trigger}] ${sweep}`);
	output.appendLine(
		`[${trigger}] ${seats.length} seat terminal(s) here, ${placed} in an editor group`
	);
	return seats;
}
