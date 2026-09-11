import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const advancedCrafting = {
  id: "01a06575-97e9-71c7-94c1-84b51f4dfe89",
  type: "world-skill",
  slug: "advanced-crafting",
  title: "Advanced Crafting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
