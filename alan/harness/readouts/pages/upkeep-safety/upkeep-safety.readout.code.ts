import { statedAt } from "akasha/alan/harness/readouts/tier/readout-tier.module.code.ts"

const SAFETY_LEVEL = "safety-level"

export function levelIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[SAFETY_LEVEL])
}
