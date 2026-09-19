import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const conversionWaterToWine = {
  id: "01a06575-97fd-7fa9-a8f5-8d820594fd7b",
  type: "page-type/world-skill",
  slug: "conversion-water-to-wine",
  title: "Conversion: Water to Wine",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
