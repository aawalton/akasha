import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fastDrying = {
  id: "01a06575-980b-7031-81b9-e07e09a7dde5",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "fast-drying",
  title: "Fast Drying",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
