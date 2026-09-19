import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const hazeOfDelirium = {
  id: "01a0655a-7b7b-7949-a902-260526117bd5",
  type: "page-type/world-condition",
  slug: "haze-of-delirium",
  title: "Haze of Delirium",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
