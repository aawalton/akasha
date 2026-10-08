import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedToughness = {
  id: "01a06575-9809-7e02-9205-67c2cad9592a",
  type: "page-type/world-skill",
  slug: "enhanced-toughness",
  title: "Enhanced Toughness",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.585Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
