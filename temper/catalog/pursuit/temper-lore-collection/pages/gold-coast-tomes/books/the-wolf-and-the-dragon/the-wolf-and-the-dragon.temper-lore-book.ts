import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWolfAndTheDragon = {
  id: "01a0d5f7-73fb-79c3-8424-b33b07afdfce",
  type: "page-type/temper-lore-book",
  slug: "the-wolf-and-the-dragon",
  title: "The Wolf and the Dragon",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3256,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
