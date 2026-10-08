import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const expertCooking = {
  id: "01a06575-980a-73a5-8b9b-ea1d50dcc80e",
  type: "page-type/world-skill",
  slug: "expert-cooking",
  title: "Expert Cooking",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.586Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
