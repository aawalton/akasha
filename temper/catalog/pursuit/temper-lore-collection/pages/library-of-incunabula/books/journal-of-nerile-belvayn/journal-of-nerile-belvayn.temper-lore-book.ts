import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfNerileBelvayn = {
  id: "01a0d5f8-02f8-7cc1-ae45-21bd936fe30a",
  type: "page-type/temper-lore-book",
  slug: "journal-of-nerile-belvayn",
  title: "Journal of Nerile Belvayn",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7350,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
