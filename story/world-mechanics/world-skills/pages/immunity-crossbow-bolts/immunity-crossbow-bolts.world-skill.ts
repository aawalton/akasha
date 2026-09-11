import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const immunityCrossbowBolts = {
  id: "01a06575-981d-74a0-bea5-e0437eb5a5a0",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "immunity-crossbow-bolts",
  title: "Immunity: Crossbow Bolts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
