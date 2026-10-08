import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const calmingTouch = {
  id: "01a06575-97fa-7517-8e9b-3cc5cc9e7525",
  type: "page-type/world-skill",
  slug: "calming-touch",
  title: "Calming Touch",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.570Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
