import type { Asking, Row } from "../../../readout-asking/readout-asking.module.code.ts"

const CLAUDE_ACCOUNT = "claude-account"

const SEVEN_DAY_PERCENT_USED = "seven-day-percent-used"

const USAGE_UNKNOWN =
  "the claude accounts could not be read, so the weekly usage is unknown rather than nothing"

export function weeklyUsageAsked(): Readonly<Record<string, unknown>> {
  return { "page-type": CLAUDE_ACCOUNT, keys: [SEVEN_DAY_PERCENT_USED] }
}

export function percentIn(held: unknown): number | null {
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  if (typeof held !== "string" || held === "") return null
  const read = Number(held)
  return Number.isFinite(read) ? read : null
}

export function meanUsedIn(rows: readonly Row[]): number | null {
  let total = 0
  let counted = 0
  for (const row of rows) {
    const percent = percentIn(row.values[SEVEN_DAY_PERCENT_USED])
    if (percent === null) continue
    total += percent
    counted += 1
  }
  return counted === 0 ? null : total / counted
}

export async function fetchWeeklyUsage(ask: Asking): Promise<number | null> {
  const asked = await ask(weeklyUsageAsked())
  if (!asked.ok) throw new Error(`${USAGE_UNKNOWN}: ${asked.why}`)
  return meanUsedIn(asked.rows)
}
