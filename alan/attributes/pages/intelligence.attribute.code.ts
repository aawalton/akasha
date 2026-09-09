import { statedAt } from "akasha/readouts/tier/readout-tier.module.code.ts"

const INTELLIGENCE_TOPICS = "intelligence-topics"

export const TOPICS_TO_THE_POINT = 4

export function intelligenceIn(values: Readonly<Record<string, unknown>>): number | null {
  const updated = statedAt(values[INTELLIGENCE_TOPICS])
  return updated === null ? null : updated / TOPICS_TO_THE_POINT
}
