import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lanceThrust = {
  id: "01a06575-9821-7c0c-ade5-dc2cdb7bbd0f",
  type: "page-type/world-skill",
  slug: "lance-thrust",
  title: "Lance Thrust",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.609Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
