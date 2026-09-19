import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const waterWalking = {
  id: "01a0657d-032c-72e0-94df-afb45a26e07b",
  type: "page-type/world-skill",
  slug: "water-walking",
  title: "Water Walking",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
