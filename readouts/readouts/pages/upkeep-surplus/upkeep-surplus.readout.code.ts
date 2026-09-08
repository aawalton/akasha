import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const SURPLUS_HOURS = "surplus-hours"

const SLEEP_HOURS = "sleep-hours"

const SPEND_HOURS = "spend-hours"

export function heldNothing(values: Readonly<Record<string, unknown>>): boolean {
  return statedAt(values[SLEEP_HOURS]) === null && statedAt(values[SPEND_HOURS]) === null
}

export function surplusIn(values: Readonly<Record<string, unknown>>): number | null {
  if (heldNothing(values)) return null
  return statedAt(values[SURPLUS_HOURS])
}
