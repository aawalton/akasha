import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const climbingExpertise = {
  id: "01a06575-97fb-7bb4-8a08-57843f625331",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "climbing-expertise",
  title: "Climbing Expertise",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
