import type { Asking, Row } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const STRETCH = "session-tracking"

const HELD_ON = "daily-tracking"

const HEALTH_CAPACITY_HOURS = "health-capacity-hours"

const START_TIME = "start-time"

const MOST_STRETCHES = 200

const CAPACITY_UNKNOWN =
  "the day's stretches could not be read, so the capacity is unknown rather than nothing"

export function stretchesOf(dayId: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": STRETCH,
    where: { [HELD_ON]: { is: dayId } },
    keys: [HEALTH_CAPACITY_HOURS],
    "sort-by": START_TIME,
    limit: MOST_STRETCHES,
  }
}

export function capacityIn(rows: readonly Row[]): number | null {
  let held: number | null = null
  for (const row of rows) {
    const hours = statedAt(row.values[HEALTH_CAPACITY_HOURS])
    if (hours === null) continue
    held = (held ?? 0) + hours
  }
  return held
}

export async function fetchCapacityHours(ask: Asking, dayId: string): Promise<number | null> {
  const asked = await ask(stretchesOf(dayId))
  if (!asked.ok) throw new Error(`${CAPACITY_UNKNOWN}: ${asked.why}`)
  return capacityIn(asked.rows)
}
