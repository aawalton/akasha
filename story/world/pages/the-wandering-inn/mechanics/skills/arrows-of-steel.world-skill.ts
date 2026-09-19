import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrowsOfSteel = {
  id: "01a06575-97ed-71cf-8e38-d63608e856fc",
  type: "page-type/world-skill",
  slug: "arrows-of-steel",
  title: "Arrows of Steel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
