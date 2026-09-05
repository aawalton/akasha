import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const SURPLUS_HOURS = "surplus-hours"

const SLEEP_HOURS = "sleep-hours"

const SPEND_HOURS = "spend-hours"

export function heldNothing(values: Readonly<Record<string, unknown>>): boolean {
  return statedAt(values[SLEEP_HOURS]) === null && statedAt(values[SPEND_HOURS]) === null
}

/**
 * The surplus a day carries, read off that day's own values.
 *
 * `alan/harness/surplus/reading` takes the reading. It asks for the day through `askDayByDate`,
 * which names the `wake-day` page type and camelizes the keys on the way in, and hands the row
 * here. The question is composed there and no question is composed here.
 *
 * The keys are spelled kebab because `dayAnswered` kebabises a row on the way out. A row still
 * spelled camel answers null through all three lookups rather than refusing, so a caller handing
 * over an unkebabised row darkens the tile and says nothing about why.
 */
export function surplusIn(values: Readonly<Record<string, unknown>>): number | null {
  if (heldNothing(values)) return null
  return statedAt(values[SURPLUS_HOURS])
}
