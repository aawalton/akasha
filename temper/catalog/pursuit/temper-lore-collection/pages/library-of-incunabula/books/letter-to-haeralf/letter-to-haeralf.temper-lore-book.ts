import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToHaeralf = {
  id: "01a0d5f8-02f8-7590-9479-617100adb191",
  type: "page-type/temper-lore-book",
  slug: "letter-to-haeralf",
  title: "Letter to Haeralf",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5684,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
