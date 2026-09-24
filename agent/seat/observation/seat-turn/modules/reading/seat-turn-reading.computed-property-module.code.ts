import type { SeatPresence } from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"

export const SEAT_TURN_STATES = ["working", "idle-pending", "ready", "idle", "stopped"] as const

export type SeatTurnState = (typeof SEAT_TURN_STATES)[number]

export const TURN_PENDING_COMPONENTS = [
  "compacting",
  "live-shell",
  "live-subagent",
  "send-in-flight",
] as const

export type TurnPendingComponent = (typeof TURN_PENDING_COMPONENTS)[number]

export interface PendingRecord {
  readonly value: boolean
}

export type TurnPending = Partial<Record<TurnPendingComponent, PendingRecord>>

export interface TurnWorking {
  readonly activeTurn?: boolean
  readonly scannedTo?: number
  readonly openShells?: readonly string[]
}

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

export function pendingOn(pending: TurnPending): readonly TurnPendingComponent[] {
  return TURN_PENDING_COMPONENTS.filter((one) => pending[one]?.value === true)
}

export function anyPendingRead(pending: TurnPending): boolean {
  return TURN_PENDING_COMPONENTS.some((one) => pending[one] !== undefined)
}

export function anyWorking(working: TurnWorking): boolean {
  return working.activeTurn === true
}

export function anyWorkingRead(working: TurnWorking): boolean {
  return working.activeTurn !== undefined
}

function idleIn(kept: SeatTurnRecords): SeatTurnReading {
  if (kept.onCallRole) return { state: "ready", waitingOn: SENT_TO_IT }
  return { state: "idle", waitingOn: null }
}

function tookATurn(kept: SeatTurnRecords): boolean {
  return anyPendingRead(kept.pending) || anyWorkingRead(kept.working)
}

export function readSeatTurn(kept: SeatTurnRecords): SeatTurnReading {
  if (!tookATurn(kept)) return { state: NO_TURN_TAKEN, waitingOn: null }
  if (kept.presence === GONE) return { state: "stopped", waitingOn: null }
  if (anyWorking(kept.working)) return { state: "working", waitingOn: null }
  if (anyPendingRead(kept.pending)) {
    const on = pendingOn(kept.pending)
    if (on.length === 0) return idleIn(kept)
    if (kept.onCallRole) return { state: "ready", waitingOn: on.join(", ") }
    return { state: "idle-pending", waitingOn: on.join(", ") }
  }
  return idleIn(kept)
}
