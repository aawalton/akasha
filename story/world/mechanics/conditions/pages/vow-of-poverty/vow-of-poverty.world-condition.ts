import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const vowOfPoverty = {
  id: "01a0655a-7b7b-7c82-a354-d2a6d9d10891",
  type: "page-type/world-condition",
  slug: "vow-of-poverty",
  title: "Vow of Poverty",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
