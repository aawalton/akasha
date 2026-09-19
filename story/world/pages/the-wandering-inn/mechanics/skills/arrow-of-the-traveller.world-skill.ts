import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrowOfTheTraveller = {
  id: "01a06575-97ed-7a55-ba9d-f73e6e833b13",
  type: "page-type/world-skill",
  slug: "arrow-of-the-traveller",
  title: "Arrow of the Traveller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
