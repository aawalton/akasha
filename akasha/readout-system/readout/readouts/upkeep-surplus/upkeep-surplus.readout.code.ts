const DAY = "daily-tracking"

const SURPLUS_HOURS = "surplus-hours"

const SLEEP_HOURS = "sleep-hours"

const SPEND_HOURS = "spend-hours"

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
    keys: [SURPLUS_HOURS, SLEEP_HOURS, SPEND_HOURS],
    limit: 1,
  }
}

export function hoursIn(held: unknown): number | null {
  if (typeof held !== "number" && typeof held !== "string") return null
  const trimmed = typeof held === "string" ? held.trim() : held
  if (trimmed === "") return null
  const hours = Number(trimmed)
  return Number.isFinite(hours) ? hours : null
}

export function heldNothing(values: Readonly<Record<string, unknown>>): boolean {
  return hoursIn(values[SLEEP_HOURS]) === null && hoursIn(values[SPEND_HOURS]) === null
}

export function surplusIn(values: Readonly<Record<string, unknown>>): number | null {
  if (heldNothing(values)) return null
  return hoursIn(values[SURPLUS_HOURS])
}

export async function fetchSurplusHours(ask: Asking, day: string): Promise<number | null> {
  const asked = await ask(trackingOn(day))
  if (!asked.ok) {
    throw new Error(
      `the tracking day could not be read, so the surplus is unknown rather than nothing: ${asked.why}`
    )
  }
  const [row] = asked.rows
  if (row === undefined) return null
  return surplusIn(row.values)
}
