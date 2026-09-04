import { agentPresence } from "../seat-presence-read/seat-presence-read.module.code.ts"
import type { SeatPresence } from "../seat-proc-key/seat-proc-key.module.code.ts"
import {
  anyWorking,
  anyWorkingRead,
  type TurnWorking,
  workingOf,
} from "../seat-turn/turn-working/turn-working.module.code.ts"
import {
  anyPendingRead,
  pendingOf,
  pendingOn,
  type TurnPending,
} from "../seat-turn-pending/seat-turn-pending.module.code.ts"

export const SEAT_TURN_STATES = ["working", "idle-pending", "idle", "stopped"] as const

export type SeatTurnState = (typeof SEAT_TURN_STATES)[number]

export interface SeatTurnRecords {
  readonly presence: SeatPresence
  readonly pending: TurnPending
  readonly working: TurnWorking
}

export interface SeatTurnReading {
  readonly state: SeatTurnState
  readonly waitingOn: string | null
}

const NO_TURN_TAKEN: SeatTurnState = "stopped"

const GONE: SeatPresence = "absent"

function idleIn(): SeatTurnReading {
  return { state: "idle", waitingOn: null }
}

export function turnStillToCome(state: SeatTurnState): boolean {
  return state === "working" || state === "idle-pending"
}

export function tookATurn(kept: SeatTurnRecords): boolean {
  return anyPendingRead(kept.pending) || anyWorkingRead(kept.working)
}

export function readSeatTurn(kept: SeatTurnRecords): SeatTurnReading {
  if (!tookATurn(kept)) return { state: NO_TURN_TAKEN, waitingOn: null }
  if (kept.presence === GONE) return { state: "stopped", waitingOn: null }
  if (anyWorking(kept.working)) return { state: "working", waitingOn: null }
  if (anyPendingRead(kept.pending)) {
    const on = pendingOn(kept.pending)
    if (on.length === 0) return idleIn()
    return { state: "idle-pending", waitingOn: on.join(", ") }
  }
  return idleIn()
}

export function seatTurnRecordsOf(agent: string): SeatTurnRecords {
  return {
    presence: agentPresence(agent),
    pending: pendingOf(agent),
    working: workingOf(agent),
  }
}

export function seatTurnStateOf(agent: string): SeatTurnReading {
  return readSeatTurn(seatTurnRecordsOf(agent))
}

export function seatTurnStateLine(reading: SeatTurnReading): string {
  const said =
    reading.waitingOn === null ? reading.state : `${reading.state} on ${reading.waitingOn}`
  return `  ${"state".padEnd(8)} ${said}`
}
