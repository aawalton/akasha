import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const instantaneousBarrage = {
  id: "01a06575-981f-7ddd-9c34-91e69c9ef7a2",
  type: "page-type/world-skill",
  slug: "instantaneous-barrage",
  title: "Instantaneous Barrage",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.607Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
