import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const climbingExpertise = {
  id: "01a06575-97fb-7bb4-8a08-57843f625331",
  type: "page-type/world-skill",
  slug: "climbing-expertise",
  title: "Climbing Expertise",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.571Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
