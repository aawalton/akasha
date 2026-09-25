import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const farewellNote = {
  id: "01a0d5f8-02f8-7eec-a6a0-dcaa6958144c",
  type: "page-type/temper-lore-book",
  slug: "farewell-note",
  title: "Farewell Note",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 3715,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
