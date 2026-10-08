import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vantirsJournal = {
  id: "01a0d5f2-253c-7faf-8372-02c4c157f276",
  type: "page-type/temper-lore-book",
  slug: "vantirs-journal",
  title: "Vantir's Journal",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 150,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:23:31.388Z",
  updatedAt: "2026-09-25T00:23:33.000Z",
} as const satisfies TemperLoreBook
