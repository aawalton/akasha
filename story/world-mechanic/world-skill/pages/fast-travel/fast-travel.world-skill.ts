import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const fastTravel = {
  id: "01a06575-980c-7b2b-9ced-79bacaaa9700",
  type: "world-skill",
  slug: "fast-travel",
  title: "Fast Travel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
