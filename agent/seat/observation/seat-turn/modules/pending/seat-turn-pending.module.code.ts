import { akashaObservedOf } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import { keepBesideUnder } from "akasha/agent/seat/modules/beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import {
  type PendingRecord,
  TURN_PENDING_COMPONENTS,
  type TurnPending,
  type TurnPendingComponent,
} from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"

const PENDING_KEY = "turn-pending"

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
  } catch (thrown) {
    process.stderr.write(`seat-turn-pending: ${page} kept nothing — ${saidBy(thrown)}\n`)
    return false
  }
}
