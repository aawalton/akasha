import { statedAt } from "akasha/alan/harness/readout/modules/tier/readout-tier.computed-property-module.code.ts"

const SLEEP_HOURS = "sleep-hours"

export function sleepIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[SLEEP_HOURS])
}
