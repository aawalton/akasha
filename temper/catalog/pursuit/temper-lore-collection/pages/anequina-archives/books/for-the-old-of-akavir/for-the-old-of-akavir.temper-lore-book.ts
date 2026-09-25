import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forTheOldOfAkavir = {
  id: "01a0d60b-2345-7a13-bd5a-83e86dd75875",
  type: "page-type/temper-lore-book",
  slug: "for-the-old-of-akavir",
  title: "For the Old of Akavir",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5485,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
