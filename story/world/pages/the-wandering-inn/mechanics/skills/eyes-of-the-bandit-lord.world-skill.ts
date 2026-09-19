import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eyesOfTheBanditLord = {
  id: "01a06575-980b-7ef8-b51e-f5b42982d57b",
  type: "page-type/world-skill",
  slug: "eyes-of-the-bandit-lord",
  title: "Eyes of the Bandit Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
