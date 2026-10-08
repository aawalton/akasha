import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enhancedTelekinesis = {
  id: "01a06575-9809-7d65-bbf5-a8d36ad1baa8",
  type: "page-type/world-skill",
  slug: "enhanced-telekinesis",
  title: "Enhanced Telekinesis",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.585Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
