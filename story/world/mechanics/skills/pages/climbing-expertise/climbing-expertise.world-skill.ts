import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const climbingExpertise = {
  id: "01a06575-97fb-7bb4-8a08-57843f625331",
  type: "page-type/world-skill",
  slug: "climbing-expertise",
  title: "Climbing Expertise",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
