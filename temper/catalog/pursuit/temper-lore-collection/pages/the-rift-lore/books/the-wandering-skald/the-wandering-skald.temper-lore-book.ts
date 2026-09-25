import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWanderingSkald = {
  id: "01a0d5e4-b08a-79c1-8b29-cc9f91f2a54c",
  type: "page-type/temper-lore-book",
  slug: "the-wandering-skald",
  title: "The Wandering Skald",
  collection: "temper-lore-collection/the-rift-lore",
  bookIndex: 3,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
