import type { WorldCondition } from "akasha/story/world-mechanics/world-conditions/world-condition.page-type.types.ts"

export const battlefieldOfTheSilent = {
  id: "01a0655a-7b7a-7cb5-8d04-ffd16c662bb4",
  type: "world-condition",
  slug: "battlefield-of-the-silent",
  title: "Battlefield of the Silent",
  world: "the-wandering-inn",
} as const satisfies WorldCondition
