import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boostedMoraleUnit = {
  id: "01a06575-97f8-7928-8e66-d238942e60eb",
  type: "page-type/world-skill",
  slug: "boosted-morale-unit",
  title: "Boosted Morale (Unit)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.568Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
