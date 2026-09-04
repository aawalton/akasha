import {
  akashaSeatPathForAgent,
  besideWrittenAtMs,
} from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaObservedOf } from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import { keepBesideUnder } from "../seat-beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "../seat-presence-read/seat-presence-read.module.code.ts"

export const PENDING_KEY = "turn-pending"

export const TURN_PENDING_COMPONENTS = [
  "compacting",
  "live-subagent",
  "send-in-flight",
  "owed",
] as const

export type TurnPendingComponent = (typeof TURN_PENDING_COMPONENTS)[number]

export interface PendingRecord {
  readonly value: boolean
  readonly at: number
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
  const page = akashaSeatPathForAgent(agent)
  const at = page === null ? 0 : besideWrittenAtMs(page)
  const said = held as Record<string, unknown>
  const found: Record<string, PendingRecord> = {}
  for (const component of TURN_PENDING_COMPONENTS) {
    const value = said[camelOf(component)]
    if (typeof value === "boolean") found[component] = { value, at }
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
  const at = Date.now()
  const standing = pendingOf(agent)
  const whole: Record<string, PendingRecord> = { ...standing }
  let changed = false
  for (const component of TURN_PENDING_COMPONENTS) {
    const value = values[component]
    if (typeof value !== "boolean") continue
    if (standing[component]?.value === value) continue
    whole[component] = { value, at }
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

export function pendingLines(pending: TurnPending): readonly string[] {
  return TURN_PENDING_COMPONENTS.map((one) => {
    const recorded = pending[one]
    const said =
      recorded === undefined
        ? "— unread"
        : `${recorded.value ? "on" : "off"} (read ${new Date(recorded.at).toISOString()})`
    return `  ${one.padEnd(15)} ${said}`
  })
}
