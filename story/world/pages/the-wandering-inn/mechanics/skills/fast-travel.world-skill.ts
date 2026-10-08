import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastTravel = {
  id: "01a06575-980c-7b2b-9ced-79bacaaa9700",
  type: "page-type/world-skill",
  slug: "fast-travel",
  title: "Fast Travel",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
