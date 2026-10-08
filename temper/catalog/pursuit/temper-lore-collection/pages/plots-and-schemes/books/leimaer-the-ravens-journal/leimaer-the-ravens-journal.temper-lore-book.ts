import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const leimaerTheRavensJournal = {
  id: "01a0d5f4-c388-78fc-98bb-73b5a0f152b4",
  type: "page-type/temper-lore-book",
  slug: "leimaer-the-ravens-journal",
  title: "Leimaer the Raven's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 337,
  bookIndex: 3,
  charted: true,
  quest: 4058,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:22.984Z",
  updatedAt: "2026-09-25T00:26:33.000Z",
} as const satisfies TemperLoreBook
