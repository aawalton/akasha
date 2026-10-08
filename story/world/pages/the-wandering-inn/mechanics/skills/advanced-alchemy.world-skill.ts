import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedAlchemy = {
  id: "01a06575-97e9-7771-96e7-b3ba242bddbc",
  type: "page-type/world-skill",
  slug: "advanced-alchemy",
  title: "Advanced Alchemy",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.553Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
