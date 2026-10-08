import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedPotions = {
  id: "01a06575-9808-721e-a7c4-b054f63bbb15",
  type: "page-type/world-skill",
  slug: "enhanced-potions",
  title: "Enhanced Potions",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.584Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
