import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedCrafting = {
  id: "01a06575-97e9-71c7-94c1-84b51f4dfe89",
  type: "page-type/world-skill",
  slug: "advanced-crafting",
  title: "Advanced Crafting",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.553Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
