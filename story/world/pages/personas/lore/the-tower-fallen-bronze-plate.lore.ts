import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerFallenBronzePlate = {
  id: "01a0d443-cfc3-7869-924b-4dbedccd9121",
  type: "page-type/lore",
  slug: "the-tower-fallen-bronze-plate",
  title: "The Fallen Bronze Plate",
  world: "world/personas",
  about: "item/the-tower-fallen-bronze-plate",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["The fallen bronze plate's acoustic shadow muffles the Hollow Cantor's song."],
} as const satisfies Lore
