import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const challengeOfHonor = {
  id: "01a06575-97fa-77d3-8fea-7cc362e533a4",
  type: "page-type/world-skill",
  slug: "challenge-of-honor",
  title: "Challenge of Honor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
