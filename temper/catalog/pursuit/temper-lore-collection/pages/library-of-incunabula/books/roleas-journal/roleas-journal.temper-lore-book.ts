import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const roleasJournal = {
  id: "01a0d5f8-02f9-7e94-b554-9d722e49e5d9",
  type: "page-type/temper-lore-book",
  slug: "roleas-journal",
  title: "Rolea's Journal",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5038,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
