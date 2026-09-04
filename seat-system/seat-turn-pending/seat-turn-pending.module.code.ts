import {
  akashaSeatPathForAgent,
  besideWrittenAtMs,
} from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaObservedOf } from "../seat-akasha-read/seat-akasha-read.module.code.ts"
import { keepBesideUnder } from "../seat-beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "../seat-presence-read/seat-presence-read.module.code.ts"

export const PENDING_KEY = "turn-pending"

export const TURN_PENDING_COMPONENTS = [
  "running-task",
  "live-child",
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

// AKASHA HOLDS WHAT A FIELD SAYS AND NOT THE MOMENT IT WAS READ, so every field is stamped with the
// moment the seat's sidecar there was last written. That is the newest any of them can be.
//
// Nothing decides anything on a stamp. `anyPendingRead` asks whether a field stands at all and
// `pendingOn` asks what it says; the one place the stamp is read is the line `seat show` prints. So
// what is lost by reading here rather than beside the old page is one rendered time.
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
): void {
  if (agent === "") return
  const seatName = seatNameForAgent(agent)
  if (seatName === null) return
  const page = seatName
  const at = Date.now()
  const standing = pendingOf(agent)
  // THE WHOLE RECORD IS HANDED OVER RATHER THAN THE FIELDS THAT CHANGED. Both stores are written
  // from this one call and they merge at different depths: the old store merges within the key and
  // keeps what it is not told about, akasha merges at the top of the page and replaces the record
  // whole. Handing over the fields that changed alone meant something had to put the other fields
  // back before akasha saw them, and what did that was a read of the old store — which is the one
  // thing that has to go before a seat can stop being written outside akasha.
  //
  // Nothing has to put them back now, because they were never taken away. A field that did not
  // change is carried at the stamp it already held, so the record says when each field was last
  // read rather than when this write happened.
  const whole: Record<string, PendingRecord> = { ...standing }
  let changed = false
  for (const component of TURN_PENDING_COMPONENTS) {
    const value = values[component]
    if (typeof value !== "boolean") continue
    if (standing[component]?.value === value) continue
    whole[component] = { value, at }
    changed = true
  }
  if (!changed) return
  try {
    keepBesideUnder(page, PENDING_KEY, whole)
  } catch {
    return
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
