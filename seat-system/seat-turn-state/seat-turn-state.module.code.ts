import { attributesOf } from "../seat-attributes/seat-attributes.module.code.ts"
import { agentPresence } from "../seat-presence-read/seat-presence-read.module.code.ts"
import type { SeatPresence } from "../seat-proc-key/seat-proc-key.module.code.ts"
import { roleIsOnCall } from "../seat-role-on-call/seat-role-on-call.module.code.ts"
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

export const SEAT_TURN_STATES = ["working", "idle-pending", "ready", "idle", "stopped"] as const

export type SeatTurnState = (typeof SEAT_TURN_STATES)[number]

export interface SeatTurnRecords {
  readonly presence: SeatPresence
  readonly pending: TurnPending
  readonly working: TurnWorking
  readonly onCallRole: boolean
}

export interface SeatTurnReading {
  readonly state: SeatTurnState
  readonly waitingOn: string | null
}

const NO_TURN_TAKEN: SeatTurnState = "stopped"

const GONE: SeatPresence = "absent"

const SENT_TO_IT = "work sent to it"

function idleIn(kept: SeatTurnRecords): SeatTurnReading {
  if (kept.onCallRole) return { state: "ready", waitingOn: SENT_TO_IT }
  return { state: "idle", waitingOn: null }
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
    if (on.length === 0) return idleIn(kept)
    return { state: "idle-pending", waitingOn: on.join(", ") }
  }
  return idleIn(kept)
}

export function seatTurnRecordsOf(agent: string): SeatTurnRecords {
  return {
    presence: agentPresence(agent),
    pending: pendingOf(agent),
    working: workingOf(agent),
    onCallRole: roleIsOnCall(attributesOf(agent).role?.slug ?? null),
  }
}

export function seatTurnStateOf(agent: string): SeatTurnReading {
  return readSeatTurn(seatTurnRecordsOf(agent))
}
