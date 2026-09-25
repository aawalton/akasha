import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nisaazdasJournal = {
  id: "01a0d5f8-02f9-7e7f-a0af-d6c4adb85587",
  type: "page-type/temper-lore-book",
  slug: "nisaazdas-journal",
  title: "Nisaazda's Journal",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5436,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
