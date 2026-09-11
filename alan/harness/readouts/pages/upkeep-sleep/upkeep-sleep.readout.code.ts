import { statedAt } from "akasha/alan/harness/readouts/tier/readout-tier.module.code.ts"

const SLEEP_HOURS = "sleep-hours"

export function sleepIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[SLEEP_HOURS])
}
