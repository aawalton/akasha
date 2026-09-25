import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToBakul = {
  id: "01a0d60b-2345-7249-9cef-fbca60886f02",
  type: "page-type/temper-lore-book",
  slug: "letter-to-bakul",
  title: "Letter to Bakul",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5450,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
