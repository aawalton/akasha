import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSeasonsOfArgonia = {
  id: "01a0d5f6-a29b-7d9c-9b77-dcbdaf83ba88",
  type: "page-type/temper-lore-book",
  slug: "the-seasons-of-argonia",
  title: "The Seasons of Argonia",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5288,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
