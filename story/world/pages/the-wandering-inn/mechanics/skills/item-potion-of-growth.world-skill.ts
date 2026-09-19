import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const itemPotionOfGrowth = {
  id: "01a06575-9820-70df-8df4-795a940fb1df",
  type: "page-type/world-skill",
  slug: "item-potion-of-growth",
  title: "Item: Potion of Growth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
