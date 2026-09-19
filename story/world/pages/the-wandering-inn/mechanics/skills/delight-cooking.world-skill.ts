import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const delightCooking = {
  id: "01a06575-9802-7709-b86a-9864c4acb14e",
  type: "page-type/world-skill",
  slug: "delight-cooking",
  title: "Delight Cooking",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
