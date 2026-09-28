import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVFood = {
  id: "01a0ea04-c282-713c-ae32-639a721c7209",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-food",
  title: "Food",
  world: "world/ends-of-magic",
  aliases: ["drink", "cuisine"],
  description: "The food and drink of Davrar.",
} as const satisfies WorldMechanic
