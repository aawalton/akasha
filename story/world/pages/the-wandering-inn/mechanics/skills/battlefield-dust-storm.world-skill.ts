import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battlefieldDustStorm = {
  id: "01a06575-97f4-7228-8b78-70a5d03cd3cd",
  type: "page-type/world-skill",
  slug: "battlefield-dust-storm",
  title: "Battlefield: Dust Storm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
