import { statedAt } from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"

const FINDINGS = "inbox-findings"

export function findingsIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[FINDINGS])
}
