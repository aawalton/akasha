import type { Asking, Row } from "akasha/alan/harness/readouts/asking/readout-asking.module.code.ts"
import { asNumber } from "akasha/utils/narrow/modules/as-number/as-number.module.code.ts"

const CLAUDE_ACCOUNT = "claude-account"

const SEVEN_DAY_PERCENT_USED = "seven-day-percent-used"

const USAGE_UNKNOWN =
  "the claude accounts could not be read, so the weekly usage is unknown rather than nothing"

function weeklyUsageAsked(): Readonly<Record<string, unknown>> {
  return { "page-type": CLAUDE_ACCOUNT, keys: [SEVEN_DAY_PERCENT_USED] }
}

function meanUsedIn(rows: readonly Row[]): number | null {
  let total = 0
  let counted = 0
  for (const row of rows) {
    const percent = asNumber(row.values[SEVEN_DAY_PERCENT_USED])
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
