import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const magicPictures = {
  id: "01a0655a-7b7f-75e3-be32-1470991f7b0c",
  type: "page-type/world-item",
  slug: "magic-pictures",
  title: "Magic Pictures",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
