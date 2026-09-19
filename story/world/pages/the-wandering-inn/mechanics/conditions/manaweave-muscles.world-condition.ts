import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const manaweaveMuscles = {
  id: "01a0655a-7b7b-7253-a2e5-3c1039778f79",
  type: "page-type/world-condition",
  slug: "manaweave-muscles",
  title: "Manaweave Muscles",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
