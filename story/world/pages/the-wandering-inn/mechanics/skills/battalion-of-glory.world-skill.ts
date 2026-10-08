import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battalionOfGlory = {
  id: "01a06575-97f4-7d09-8b5d-71861422bb5a",
  type: "page-type/world-skill",
  slug: "battalion-of-glory",
  title: "Battalion of Glory",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
