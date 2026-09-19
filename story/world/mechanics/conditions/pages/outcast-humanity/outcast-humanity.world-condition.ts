import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const outcastHumanity = {
  id: "01a0655a-7b7b-706b-aafc-2a6e660fb6ab",
  type: "page-type/world-condition",
  slug: "outcast-humanity",
  title: "Outcast Humanity",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
