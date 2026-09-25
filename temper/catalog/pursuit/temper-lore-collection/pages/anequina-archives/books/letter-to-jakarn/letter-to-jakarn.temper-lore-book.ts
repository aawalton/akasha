import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToJakarn = {
  id: "01a0d60b-2345-7f58-a93e-1fc131ec3e0c",
  type: "page-type/temper-lore-book",
  slug: "letter-to-jakarn",
  title: "Letter to Jakarn",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5479,
  bookIndex: 12,
  charted: true,
  quest: 6365,
  positions: "jsonl",
} as const satisfies TemperLoreBook
