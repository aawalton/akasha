import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrawledTally = {
  id: "01a0d5f8-02f9-76f1-9d98-5aea070dad6c",
  type: "page-type/temper-lore-book",
  slug: "scrawled-tally",
  title: "Scrawled Tally",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 4624,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
