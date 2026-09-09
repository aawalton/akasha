import type { WorldSkill } from "../../world-skill.page-type.ts"

export const generalCensus = {
  id: "01a06575-9814-719c-a2b3-db9c3dda4e05",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "general-census",
  title: "General Census",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
