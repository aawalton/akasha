import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const wandOfTheMrsha = {
  id: "01a0655a-7b80-748a-b385-faf19e7022d6",
  type: "page-type/world-item",
  slug: "wand-of-the-mrsha",
  title: "Wand of the Mrsha",
  world: "world/the-wandering-inn",
} as const satisfies WorldItem
