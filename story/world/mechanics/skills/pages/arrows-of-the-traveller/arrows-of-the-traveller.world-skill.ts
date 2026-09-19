import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrowsOfTheTraveller = {
  id: "01a06575-97ed-77b7-929d-9bb10ada0f03",
  type: "page-type/world-skill",
  slug: "arrows-of-the-traveller",
  title: "Arrows of the Traveller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
