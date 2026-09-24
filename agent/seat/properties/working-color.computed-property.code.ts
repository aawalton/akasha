import type { SeatPresence } from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import {
  readSeatTurn,
  type SeatTurnRecords,
  TURN_PENDING_COMPONENTS,
  type TurnPending,
  type TurnPendingComponent,
  type TurnWorking,
} from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import type { WorkingColor } from "akasha/agent/seat/properties/working-color.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Kept = {
  readonly role?: string
  readonly supervisorProcess?: string
  readonly turnPending?: Readonly<Record<string, unknown>>
  readonly turnWorking?: Readonly<Record<string, unknown>>
}

type RoleStated = { readonly onCall?: boolean }

type StateStated = { readonly color?: string }

export const TURN_STATE = "seat-turn-state/"

const KEPT_AS: Readonly<Record<TurnPendingComponent, string>> = {
  compacting: "compacting",
  "live-shell": "liveShell",
  "live-subagent": "liveSubagent",
  "send-in-flight": "sendInFlight",
}

function presenceOf(stated: unknown): SeatPresence {
  return typeof stated === "string" && stated !== "" ? "unknown" : "absent"
}

function pendingIn(kept: Readonly<Record<string, unknown>> | undefined): TurnPending {
  const found: { [component in TurnPendingComponent]?: { readonly value: boolean } } = {}
  if (kept === undefined || kept === null) return found
  for (const component of TURN_PENDING_COMPONENTS) {
    const value = kept[KEPT_AS[component]]
    if (typeof value === "boolean") found[component] = { value }
  }
  return found
}

function workingIn(kept: Readonly<Record<string, unknown>> | undefined): TurnWorking {
  const active = kept?.activeTurn
  return typeof active === "boolean" ? { activeTurn: active } : {}
}

export function recordsOf(page: Kept, onCallRole: boolean): SeatTurnRecords {
  return {
    presence: presenceOf(page.supervisorProcess),
    pending: pendingIn(page.turnPending),
    working: workingIn(page.turnWorking),
    onCallRole,
  }
}

export const work: Work<Kept, WorkingColor> = (page, reach) => {
  const role = typeof page.role === "string" ? reach.target<RoleStated>(page.role) : null
  const { state } = readSeatTurn(recordsOf(page, role?.onCall === true))
  const color = reach.target<StateStated>(`${TURN_STATE}${state}`)?.color
  return typeof color === "string" && color !== "" ? color : null
}
