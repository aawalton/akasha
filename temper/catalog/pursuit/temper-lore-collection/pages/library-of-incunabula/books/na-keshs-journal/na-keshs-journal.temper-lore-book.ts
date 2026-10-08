import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const naKeshsJournal = {
  id: "01a0d5f8-02f9-74f8-9b01-8619f7ba5e78",
  type: "page-type/temper-lore-book",
  slug: "na-keshs-journal",
  title: "Na-Kesh's Journal",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 3717,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:29:55.833Z",
  updatedAt: "2026-09-25T00:29:58.000Z",
} as const satisfies TemperLoreBook
