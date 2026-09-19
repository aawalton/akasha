import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const estateCollectTaxesCrops = {
  id: "01a06575-9809-7553-9810-bbedc6525ede",
  type: "page-type/world-skill",
  slug: "estate-collect-taxes-crops",
  title: "Estate: Collect Taxes (Crops)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
