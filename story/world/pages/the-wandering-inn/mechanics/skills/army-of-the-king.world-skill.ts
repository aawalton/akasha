import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armyOfTheKing = {
  id: "01a06575-97ed-7010-929c-4c3069b5890a",
  type: "page-type/world-skill",
  slug: "army-of-the-king",
  title: "Army of the King",
  world: "world/the-wandering-inn",
  appearanceCount: 16,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.557Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
