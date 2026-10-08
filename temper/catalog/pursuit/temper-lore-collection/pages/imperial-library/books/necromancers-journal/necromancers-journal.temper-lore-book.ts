import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const necromancersJournal = {
  id: "01a0d5f6-f385-7517-9ea5-57a8519bfed0",
  type: "page-type/temper-lore-book",
  slug: "necromancers-journal",
  title: "Necromancer's Journal",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 2903,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:46.341Z",
  updatedAt: "2026-09-25T00:28:47.000Z",
} as const satisfies TemperLoreBook
