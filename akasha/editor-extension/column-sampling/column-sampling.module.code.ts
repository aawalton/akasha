import { columns, output } from "../agent-tree-state/agent-tree-state.module.code.ts"
import {
  recordObservation,
  recordSweep,
} from "../observation-store/observation-store.module.code.ts"
import {
  readSeatLookup,
  readSeatTerminals,
  type SeatTerminal,
} from "../seat-terminals/seat-terminals.module.code.ts"
import { PROCESS_ID_TIMEOUT_MS } from "../terminal-pids/terminal-pids.module.code.ts"

export async function sampleColumns(
  trigger: string,
  feature: string
): Promise<readonly SeatTerminal[] | undefined> {
  const { seatNames, psRows, tmuxClients } = await readSeatLookup()
  if (psRows.length === 0) {
    return undefined
  }
  const { seats, sweep, counted, ms } = await readSeatTerminals(seatNames, psRows, tmuxClients)
  columns.record(seats)
  const placed = seats.filter((s) => s.column !== undefined).length
  recordSweep(feature, { ...counted, boundMs: PROCESS_ID_TIMEOUT_MS, ms, trigger })
  recordObservation(feature, { counts: { seatTerminals: seats.length, placed } })
  output.appendLine(`[${trigger}] ${sweep}`)
  output.appendLine(
    `[${trigger}] ${seats.length} seat terminal(s) here, ${placed} in an editor group`
  )
  return seats
}
