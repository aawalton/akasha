import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRoadToSovngarde = {
  id: "01a0d5e4-b08a-7382-a2d1-fc95911496a8",
  type: "page-type/temper-lore-book",
  slug: "the-road-to-sovngarde",
  title: "The Road to Sovngarde",
  collection: "temper-lore-collection/the-rift-lore",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
