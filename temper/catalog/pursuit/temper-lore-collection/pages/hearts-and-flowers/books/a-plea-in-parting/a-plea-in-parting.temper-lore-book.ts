import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aPleaInParting = {
  id: "01a0d5f2-af6f-7246-8b94-e9441d38040e",
  type: "page-type/temper-lore-book",
  slug: "a-plea-in-parting",
  title: "A Plea in Parting",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 456,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
