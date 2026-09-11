import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const challengeOfHonor = {
  id: "01a06575-97fa-77d3-8fea-7cc362e533a4",
  type: "world-skill",
  slug: "challenge-of-honor",
  title: "Challenge of Honor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
