import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doubleCut = {
  id: "01a06575-9805-7217-b186-89759876d738",
  type: "page-type/world-skill",
  slug: "double-cut",
  title: "Double Cut",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.581Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
