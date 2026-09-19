import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bridalPriceEstimates = {
  id: "01a06575-97f9-7211-9a75-9bc6819eeccb",
  type: "page-type/world-skill",
  slug: "bridal-price-estimates",
  title: "Bridal Price Estimates",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
