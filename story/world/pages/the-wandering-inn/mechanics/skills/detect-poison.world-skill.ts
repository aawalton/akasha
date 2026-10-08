import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectPoison = {
  id: "01a06575-9803-7ca9-ac98-a6a3b6d29b50",
  type: "page-type/world-skill",
  slug: "detect-poison",
  title: "Detect Poison",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.579Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
