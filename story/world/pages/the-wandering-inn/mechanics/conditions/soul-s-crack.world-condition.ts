import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const soulSCrack = {
  id: "01a0655a-7b7b-793a-9cc1-d3568f4fd743",
  type: "page-type/world-condition",
  slug: "soul-s-crack",
  title: "Soul’s Crack",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
