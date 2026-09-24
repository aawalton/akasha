import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerShatteredStatuary = {
  id: "01a0d443-541f-7083-b48c-0cd59c1cd92d",
  type: "page-type/item",
  slug: "the-tower-shattered-statuary",
  title: "Shattered statuary",
  story: "story-played/the-tower",
  place: "place/the-tower-gallery-nave",
  description: "Broken statues across the floor: rubble, chunks and a few long marble shards.",
} as const satisfies Item
