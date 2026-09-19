import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedCrafting = {
  id: "01a06575-97e9-71c7-94c1-84b51f4dfe89",
  type: "page-type/world-skill",
  slug: "advanced-crafting",
  title: "Advanced Crafting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
