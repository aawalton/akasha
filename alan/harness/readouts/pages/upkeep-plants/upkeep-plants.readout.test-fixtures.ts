import type { Row } from "akasha/alan/harness/readouts/asking/readout-asking.module.code.ts"

export function ate(grams: unknown): Row {
  return { values: { id: "one", plantGrams: grams } }
}
