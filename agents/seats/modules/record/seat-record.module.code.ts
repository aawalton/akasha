import { seatNameForAgent } from "akasha/agents/seats/modules/presence-read/seat-presence-read.module.code.ts"
import { akashaSeatRecordOf } from "akasha/seat-system/seat-akasha-read/seat-akasha-read.module.code.ts"
import { dropBeside, keepBeside } from "akasha/seat-system/seat-beside/seat-beside.module.code.ts"

function whereToWrite(agent: string): string | null {
  return seatNameForAgent(agent)
}

export interface SeatRecord {
  readonly value: string
  readonly at: number
}

export function seatRecordOf(agent: string, key: string): SeatRecord | null {
  if (agent === "") return null
  return akashaSeatRecordOf(agent, key)
}

export function keepSeatRecord(
  agent: string,
  key: string,
  value: string,
  at: number = Date.now()
): undefined {
  if (agent === "" || value === "") return
  try {
    const page = whereToWrite(agent)
    if (page === null) return
    keepBeside(page, { [key]: { value, at } })
  } catch {
    return
  }
}

export function backfillSeatRecord(agent: string, key: string, held: string | null): undefined {
  if (held === null || held === "") return
  if (seatRecordOf(agent, key) !== null) return
  keepSeatRecord(agent, key, held)
}

export function dropSeatRecord(agent: string, key: string): undefined {
  if (agent === "") return
  try {
    const page = whereToWrite(agent)
    if (page === null) return
    dropBeside(page, [key])
  } catch {
    return
  }
}
