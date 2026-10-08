import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const authorityDoors = {
  id: "01a06575-97f0-72f4-a9b0-8e5224c08ca1",
  type: "page-type/world-skill",
  slug: "authority-doors",
  title: "Authority: Doors",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.560Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
