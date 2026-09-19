import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eyesOfPersonality = {
  id: "01a06575-980b-7d4a-be1d-a518465b97b1",
  type: "page-type/world-skill",
  slug: "eyes-of-personality",
  title: "Eyes of Personality",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
