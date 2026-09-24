import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerRestCouches = {
  id: "01a0d445-ac77-79b7-8ba6-34befb3f2264",
  type: "page-type/lore",
  slug: "the-tower-rest-couches",
  title: "The Rest-Couches",
  world: "world/personas",
  about: "item/the-tower-rest-couches",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Whoever sleeps on the Hall of Welcome's couches or bed never wakes.",
    "The False Haven feeds on climbers who fall asleep in it.",
  ],
} as const satisfies Lore
