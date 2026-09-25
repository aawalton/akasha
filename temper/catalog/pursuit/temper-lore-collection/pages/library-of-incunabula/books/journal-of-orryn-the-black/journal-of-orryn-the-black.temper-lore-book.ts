import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfOrrynTheBlack = {
  id: "01a0d5f8-02f8-7d8c-9f07-a4ac03c05304",
  type: "page-type/temper-lore-book",
  slug: "journal-of-orryn-the-black",
  title: "Journal of Orryn the Black",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 4914,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
