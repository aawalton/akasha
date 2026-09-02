import type { Asking, Row } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const PERSONA_DAY = "persona-day"

const RUNG = "green-day-rung"

const DATE = "date"

const VALUE_SLUG = "value-slug"

const WEALTH = "wealth"

const WEALTH_UNKNOWN =
  "the persona days could not be read, so the wealth units are unknown rather than nothing"

export function wealthOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": PERSONA_DAY,
    where: { [DATE]: { is: day }, [VALUE_SLUG]: { is: WEALTH } },
    keys: [RUNG],
  }
}

export function unitsIn(rows: readonly Row[]): number | null {
  let total: number | null = null
  for (const row of rows) {
    const rung = statedAt(row.values[RUNG])
    if (rung === null) continue
    total = (total ?? 0) + rung
  }
  return total
}

export async function fetchWealthUnits(ask: Asking, day: string): Promise<number | null> {
  const asked = await ask(wealthOn(day))
  if (!asked.ok) throw new Error(`${WEALTH_UNKNOWN}: ${asked.why}`)
  return unitsIn(asked.rows)
}
