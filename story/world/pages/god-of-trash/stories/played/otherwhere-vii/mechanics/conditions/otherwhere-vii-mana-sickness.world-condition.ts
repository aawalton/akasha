import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const otherwhereViiManaSickness = {
  id: "01a0ea41-c76b-74a5-ac0c-64265ff0b2f4",
  type: "page-type/world-condition",
  slug: "otherwhere-vii-mana-sickness",
  title: "Mana-sickness",
  world: "world/god-of-trash",
  description: "A fever of too much mana: a flushed face, a burning belly and wavering sight.",
} as const satisfies WorldCondition
