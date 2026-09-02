const DAY = "daily-tracking"

const TEMPER_TASKS = "inbox-temper-tasks"

const DATE = "date"

export type Row = { readonly values: Readonly<Record<string, unknown>> }

export type Answered =
  | { readonly ok: true; readonly rows: readonly Row[] }
  | { readonly ok: false; readonly why: string }

export type Asking = (query: Readonly<Record<string, unknown>>) => Promise<Answered>

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [TEMPER_TASKS],
    limit: 1,
  }
}

export function tasksIn(values: Readonly<Record<string, unknown>>): number | null {
  const held = values[TEMPER_TASKS]
  if (typeof held !== "number" && typeof held !== "string") return null
  const trimmed = typeof held === "string" ? held.trim() : held
  if (trimmed === "") return null
  const waiting = Number(trimmed)
  return Number.isFinite(waiting) ? waiting : null
}

export async function fetchTemperTasks(ask: Asking, day: string): Promise<number | null> {
  const asked = await ask(trackingOn(day))
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so the game tasks waiting are unknown rather than none: ${asked.why}`
    )
  }
  const [row] = asked.rows
  if (row === undefined) return null
  return tasksIn(row.values)
}
