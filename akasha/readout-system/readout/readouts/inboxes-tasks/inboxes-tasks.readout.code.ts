import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const TASKS = "inbox-tasks"

const DATE = "date"

const TASKS_UNKNOWN =
  "the tracking day could not be read, so the tasks waiting are unknown rather than none"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [TASKS],
    limit: 1,
  }
}

export function tasksIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[TASKS])
}

export async function fetchTasks(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), TASKS_UNKNOWN)
  return row === null ? null : tasksIn(row.values)
}
