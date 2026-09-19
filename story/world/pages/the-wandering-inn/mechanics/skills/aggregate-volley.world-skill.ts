import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aggregateVolley = {
  id: "01a06575-97ea-7683-9138-45d767735ff2",
  type: "page-type/world-skill",
  slug: "aggregate-volley",
  title: "Aggregate Volley",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
