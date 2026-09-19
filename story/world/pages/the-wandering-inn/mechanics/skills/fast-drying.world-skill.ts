import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastDrying = {
  id: "01a06575-980b-7031-81b9-e07e09a7dde5",
  type: "page-type/world-skill",
  slug: "fast-drying",
  title: "Fast Drying",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
