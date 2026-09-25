import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToTheMagnastylus = {
  id: "01a0d5f8-02f8-7fa6-8d1f-ccd2ee9b0bba",
  type: "page-type/temper-lore-book",
  slug: "letter-to-the-magnastylus",
  title: "Letter to the Magnastylus",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7475,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
