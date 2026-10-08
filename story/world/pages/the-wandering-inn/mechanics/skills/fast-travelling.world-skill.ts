import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastTravelling = {
  id: "01a06575-980c-75e9-86a3-ad01fc3d3319",
  type: "page-type/world-skill",
  slug: "fast-travelling",
  title: "Fast Travelling",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
