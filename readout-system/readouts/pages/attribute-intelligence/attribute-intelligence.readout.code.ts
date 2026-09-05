import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const INTELLIGENCE_WORDS = "intelligence-words"

export const WORDS_TO_THE_POINT = 10000

export function intelligenceIn(values: Readonly<Record<string, unknown>>): number | null {
  const written = statedAt(values[INTELLIGENCE_WORDS])
  return written === null ? null : written / WORDS_TO_THE_POINT
}
