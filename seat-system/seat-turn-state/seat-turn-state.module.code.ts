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

export const SEAT_TURN_STATES = ["working", "idle-pending", "idle", "stopped"] as const

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

// What a seat in an on-call role is between turns: ready for whatever is sent to it, which is the
// phrase the on-call property itself is defined by.
const SENT_TO_IT = "work sent to it"

// A SEAT IN AN ON-CALL ROLE IS WAITING EVEN WHEN IT HOLDS NOTHING TO WAIT ON. Idle and waiting are
// two different things to see on a row: idle says nobody is coming, and waiting says the seat is
// between one piece of work and the next. A handler between messages is the second, and it drew as
// the first — yellow, the color for a seat that has finished and been left — for as long as the
// states have had colors.
//
// THE ROLE ANSWERS THIS RATHER THAN THE SEAT'S OWN ON-CALL FLAG. Those are two facts: the flag says
// this seat was put on call, which a seat of any role may be, and the role says every seat of that
// role is on call by what the role is. A seat put on call to carry one errand is still idle between
// turns; a handler never is.
function idleIn(kept: SeatTurnRecords): SeatTurnReading {
  if (kept.onCallRole) return { state: "idle-pending", waitingOn: SENT_TO_IT }
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
