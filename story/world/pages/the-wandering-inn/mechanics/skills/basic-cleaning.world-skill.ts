import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicCleaning = {
  id: "01a06575-97f3-7906-a7ef-461259ab52b8",
  type: "page-type/world-skill",
  slug: "basic-cleaning",
  title: "Basic Cleaning",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.563Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
