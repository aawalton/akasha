import { akashaObservedOf } from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import { keepBesideUnder } from "../seat-beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "../seat-presence-read/seat-presence-read.module.code.ts"

export const PENDING_KEY = "turn-pending"

export const TURN_PENDING_COMPONENTS = [
  "compacting",
  "live-shell",
  "live-subagent",
  "send-in-flight",
] as const

export type TurnPendingComponent = (typeof TURN_PENDING_COMPONENTS)[number]

// WHAT IS KEPT OF A COMPONENT IS THE BOOLEAN. There was a stamp beside it once, and it never left
// this process: the write strips a `{ value, at }` down to the value, and akasha declares no field
// to land the stamp in. What came back was the sidecar's own mtime put back on, which says when the
// file was last written rather than when the component changed.
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

function camelOf(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
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
    const value = said[camelOf(component)]
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
