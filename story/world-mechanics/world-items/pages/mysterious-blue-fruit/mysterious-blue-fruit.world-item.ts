import type { WorldItem } from "akasha/story/world-mechanics/world-items/world-item.page-type.types.ts"

export const mysteriousBlueFruit = {
  id: "01a0655a-7b7f-7508-988d-e962bde97929",
  type: "world-item",
  slug: "mysterious-blue-fruit",
  title: "Mysterious Blue Fruit",
  world: "the-wandering-inn",
} as const satisfies WorldItem
