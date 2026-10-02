import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const overwhereIvCut = {
  id: "01a0ff03-c2c5-7de4-9f35-d0f5231e1a33",
  type: "page-type/world-condition",
  slug: "overwhere-iv-cut",
  title: "Cut",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of a body with an open cut that stings and bleeds until bound.",
} as const satisfies WorldCondition
