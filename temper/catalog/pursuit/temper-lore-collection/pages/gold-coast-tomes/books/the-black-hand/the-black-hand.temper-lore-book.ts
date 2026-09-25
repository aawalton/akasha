import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlackHand = {
  id: "01a0d5f7-73fb-7f0e-880c-1bbd4aaf3f71",
  type: "page-type/temper-lore-book",
  slug: "the-black-hand",
  title: "The Black Hand",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3741,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
