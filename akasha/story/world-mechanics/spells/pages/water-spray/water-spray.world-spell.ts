import type { WorldSpell } from "../../world-spell.page-type.ts"

export const waterSpray = {
  id: "01a06572-95e9-7db4-93b6-65b27dfa58d6",
  pageTypeSlug: "world-spell",
  slug: "water-spray",
  title: "Water Spray",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
