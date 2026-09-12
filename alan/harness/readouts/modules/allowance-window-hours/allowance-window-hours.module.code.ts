import type { Asking, Row } from "akasha/alan/harness/readouts/asking/readout-asking.module.code.ts"
import { asInstant } from "akasha/utils/narrow/modules/as-instant/as-instant.module.code.ts"
import { asNumber } from "akasha/utils/narrow/modules/as-number/as-number.module.code.ts"

const CLAUDE_ACCOUNT = "claude-account"

const ALL_OF_IT = 100

const HOUR = 3_600_000

const WINDOW_UNKNOWN =
  "the claude accounts could not be read, so the hours are unknown rather than nothing"

export type Counted = "spent" | "left"

function windowsAsked(percentKey: string, resetsAtKey: string): Readonly<Record<string, unknown>> {
  return { "page-type": CLAUDE_ACCOUNT, keys: [percentKey, resetsAtKey] }
}

function soonestHoursIn(
  rows: readonly Row[],
  now: number,
  percentKey: string,
  resetsAtKey: string,
  counted: Counted
): number | null {
  let soonest: number | null = null
  for (const row of rows) {
    const percent = asNumber(row.values[percentKey])
    if (percent === null) continue
    const usedUp = percent >= ALL_OF_IT
    if (usedUp !== (counted === "spent")) continue
    const at = asInstant(row.values[resetsAtKey])
    if (at === null || at < now) continue
    if (soonest === null || at < soonest) soonest = at
  }
  return soonest === null ? null : (soonest - now) / HOUR
}

export async function windowHours(
  ask: Asking,
  now: number,
  percentKey: string,
  resetsAtKey: string,
  counted: Counted
): Promise<number | null> {
  const asked = await ask(windowsAsked(percentKey, resetsAtKey))
  if (!asked.ok) throw new Error(`${WINDOW_UNKNOWN}: ${asked.why}`)
  return soonestHoursIn(asked.rows, now, percentKey, resetsAtKey, counted)
}
