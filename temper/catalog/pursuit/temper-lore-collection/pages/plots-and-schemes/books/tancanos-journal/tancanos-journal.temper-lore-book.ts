import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tancanosJournal = {
  id: "01a0d5f4-c389-7b92-8d6c-f6b26f9e83b4",
  type: "page-type/temper-lore-book",
  slug: "tancanos-journal",
  title: "Tancano's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 723,
  bookIndex: 20,
  charted: true,
  quest: 4266,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:22.985Z",
  updatedAt: "2026-09-25T00:26:33.000Z",
} as const satisfies TemperLoreBook
