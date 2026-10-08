import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battlefieldAwareness = {
  id: "01a06575-97f4-763c-8b59-f4a42f9090e8",
  type: "page-type/world-skill",
  slug: "battlefield-awareness",
  title: "Battlefield Awareness",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
