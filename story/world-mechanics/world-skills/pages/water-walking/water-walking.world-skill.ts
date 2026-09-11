import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const waterWalking = {
  id: "01a0657d-032c-72e0-94df-afb45a26e07b",
  type: "world-skill",
  slug: "water-walking",
  title: "Water Walking",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
