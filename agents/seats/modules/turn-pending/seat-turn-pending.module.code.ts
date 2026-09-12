import { seatNameForAgent } from "akasha/agents/seats/modules/presence-read/seat-presence-read.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { akashaObservedOf } from "akasha/seat-system/seat-akasha-read/seat-akasha-read.module.code.ts"
import { keepBesideUnder } from "akasha/seat-system/seat-beside/seat-beside.module.code.ts"

const PENDING_KEY = "turn-pending"

const TURN_PENDING_COMPONENTS = [
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

export function pendingOn(pending: TurnPending): readonly TurnPendingComponent[] {
  return TURN_PENDING_COMPONENTS.filter((one) => pending[one]?.value === true)
}

export function anyPendingRead(pending: TurnPending): boolean {
  return TURN_PENDING_COMPONENTS.some((one) => pending[one] !== undefined)
}

export function pendingOf(agent: string): TurnPending {
  if (agent === "") return {}
  const held = akashaObservedOf(agent)?.[PENDING_KEY]
  if (held === null || held === undefined || typeof held !== "object" || Array.isArray(held)) {
    return {}
  }
  const said = held as Record<string, unknown>
  const found: Record<string, PendingRecord> = {}
  for (const component of TURN_PENDING_COMPONENTS) {
    const value = said[exportedAs(component)]
    if (typeof value === "boolean") found[component] = { value }
  }
  return found
}

export function setPending(
  agent: string,
  values: Partial<Record<TurnPendingComponent, boolean>>
): boolean {
  if (agent === "") return false
  const seatName = seatNameForAgent(agent)
  if (seatName === null) return false
  const page = seatName
  const kept = pendingOf(agent)
  const whole: Record<string, PendingRecord> = { ...kept }
  let changed = false
  for (const component of TURN_PENDING_COMPONENTS) {
    const value = values[component]
    if (typeof value !== "boolean") continue
    if (kept[component]?.value === value) continue
    whole[component] = { value }
    changed = true
  }
  if (!changed) return false
  try {
    keepBesideUnder(page, PENDING_KEY, whole)
    return true
  } catch {
    return false
  }
}
