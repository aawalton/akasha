import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const painedNerves = {
  id: "01a0655a-7b7b-7d4d-9764-8ef29d1ddca1",
  type: "page-type/world-condition",
  slug: "pained-nerves",
  title: "Pained Nerves",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
