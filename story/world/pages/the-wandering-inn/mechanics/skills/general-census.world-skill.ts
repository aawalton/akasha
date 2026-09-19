import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const generalCensus = {
  id: "01a06575-9814-719c-a2b3-db9c3dda4e05",
  type: "page-type/world-skill",
  slug: "general-census",
  title: "General Census",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
