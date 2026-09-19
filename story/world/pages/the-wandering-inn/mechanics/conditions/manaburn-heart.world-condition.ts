import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const manaburnHeart = {
  id: "01a0655a-7b7b-758b-b7b4-76bdd715fe1c",
  type: "page-type/world-condition",
  slug: "manaburn-heart",
  title: "Manaburn Heart",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
