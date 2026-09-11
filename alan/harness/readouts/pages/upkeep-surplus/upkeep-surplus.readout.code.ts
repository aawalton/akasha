import { statedAt } from "akasha/alan/harness/readouts/tier/readout-tier.module.code.ts"
import {
  gapIn,
  multiplierFor,
} from "akasha/alan/track/daily/days/modules/cost-multiplier/cost-multiplier.computed-property-module.code.ts"

const SURPLUS_HOURS = "surplus-hours"

const SLEEP_HOURS = "sleep-hours"

const SPEND_HOURS = "spend-hours"

const SESSIONS = "sessions"

const END_TIME = "endTime"

const NOT_FALLING = 0

export function heldNothing(values: Readonly<Record<string, unknown>>): boolean {
  return statedAt(values[SLEEP_HOURS]) === null && statedAt(values[SPEND_HOURS]) === null
}

export function surplusIn(values: Readonly<Record<string, unknown>>): number | null {
  if (heldNothing(values)) return null
  return statedAt(values[SURPLUS_HOURS])
}

export function stillRunning(row: Readonly<Record<string, unknown>>): boolean {
  const ended = row[END_TIME]
  return typeof ended !== "string" || ended.trim() === ""
}

export function fallsPerHourIn(values: Readonly<Record<string, unknown>>): number {
  const rows = values[SESSIONS]
  if (!Array.isArray(rows)) return NOT_FALLING
  let falls = NOT_FALLING
  for (const row of rows) {
    if (typeof row !== "object" || row === null) continue
    const stretch = row as Readonly<Record<string, unknown>>
    if (!stillRunning(stretch)) continue
    falls += multiplierFor(gapIn(stretch))
  }
  return falls
}
