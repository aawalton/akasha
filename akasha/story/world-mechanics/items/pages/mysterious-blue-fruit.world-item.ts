import type { WorldItem } from "../world-item.page-type.ts"

export const mysteriousBlueFruit = {
  id: "01a0655a-7b7f-7508-988d-e962bde97929",
  pageTypeSlug: "world-item",
  slug: "mysterious-blue-fruit",
  title: "Mysterious Blue Fruit",
  worldSlug: "the-wandering-inn",
} as const satisfies WorldItem
