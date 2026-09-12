import { pageTextOf } from "akasha/agents/seats/modules/page-values/seat-page-values.module.code.ts"
import {
  dropSeatRecord,
  keepSeatRecord,
  seatRecordOf,
} from "akasha/agents/seats/modules/record/seat-record.module.code.ts"
import {
  type SessionRecord,
  sessionRecordOf,
} from "akasha/agents/seats/modules/session/seat-session.module.code.ts"

export const ROTATED_KEY = "rotated-session-uuid"

const KEY = ROTATED_KEY

export function rotatedOf(agent: string): SessionRecord | null {
  const kept = seatRecordOf(agent, KEY)
  const stood = kept === null ? null : sessionRecordOf(kept.value)
  return stood ?? sessionRecordOf(pageTextOf(agent, KEY))
}

export function keepRotated(agent: string, value: string, at?: number): undefined {
  if (sessionRecordOf(value) === null) return
  keepSeatRecord(agent, KEY, value, at)
}

export function clearRotated(agent: string): undefined {
  dropSeatRecord(agent, KEY)
}
