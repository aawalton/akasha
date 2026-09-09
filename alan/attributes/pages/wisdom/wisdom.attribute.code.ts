import { statedAt } from "akasha/readouts/tier/readout-tier.module.code.ts"

const WISDOM_WORDS = "wisdom-words"

export const WORDS_TO_THE_POINT = 10000

export function wisdomIn(values: Readonly<Record<string, unknown>>): number | null {
  const written = statedAt(values[WISDOM_WORDS])
  return written === null ? null : written / WORDS_TO_THE_POINT
}
