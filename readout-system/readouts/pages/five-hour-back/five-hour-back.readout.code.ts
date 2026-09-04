import type { Asking, Row } from "../../../readout-asking/readout-asking.module.code.ts"

const CLAUDE_ACCOUNT = "claude-account"

const PERCENT_USED = "five-hour-percent-used"

const RESETS_AT = "five-hour-resets-at"

const SPENT = 100

const HOUR = 3_600_000

const WINDOW_UNKNOWN =
  "the claude accounts could not be read, so the hours are unknown rather than nothing"

export function fiveHourBackAsked(): Readonly<Record<string, unknown>> {
  return { "page-type": CLAUDE_ACCOUNT, keys: [PERCENT_USED, RESETS_AT] }
}

export function numberIn(held: unknown): number | null {
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held === "") return null
  const read = Number(held)
  return Number.isFinite(read) ? read : null
}

export function instantIn(held: unknown): number | null {
  if (typeof held !== "string" || held === "") return null
  const read = Date.parse(held)
  return Number.isFinite(read) ? read : null
}

export function hoursIn(rows: readonly Row[], now: number): number | null {
  let soonest: number | null = null
  for (const row of rows) {
    const percent = numberIn(row.values[PERCENT_USED])
    if (percent === null || percent < SPENT) continue
    const at = instantIn(row.values[RESETS_AT])
    if (at === null || at < now) continue
    if (soonest === null || at < soonest) soonest = at
  }
  return soonest === null ? null : (soonest - now) / HOUR
}

export async function fetchFiveHourBack(
  ask: Asking,
  now: number = Date.now()
): Promise<number | null> {
  const asked = await ask(fiveHourBackAsked())
  if (!asked.ok) throw new Error(`${WINDOW_UNKNOWN}: ${asked.why}`)
  return hoursIn(asked.rows, now)
}
