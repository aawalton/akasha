import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const burntScripture = {
  id: "01a0d5f8-02f8-7026-b433-cfa965dda918",
  type: "page-type/temper-lore-book",
  slug: "burnt-scripture",
  title: "Burnt Scripture",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5438,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
