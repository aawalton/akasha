import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const norgorgolsJournal = {
  id: "01a0d5f8-02f9-7de6-a061-2ba6c2a5a8de",
  type: "page-type/temper-lore-book",
  slug: "norgorgols-journal",
  title: "Norgorgol's Journal",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 4626,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
