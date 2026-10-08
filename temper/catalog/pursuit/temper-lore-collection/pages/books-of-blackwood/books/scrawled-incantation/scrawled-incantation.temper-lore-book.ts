import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrawledIncantation = {
  id: "01a0d60b-fdb1-765c-a8ac-e84352f271f1",
  type: "page-type/temper-lore-book",
  slug: "scrawled-incantation",
  title: "Scrawled Incantation",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6498,
  bookIndex: 61,
  charted: true,
  quest: 6634,
  positions: "jsonl",
  createdAt: "2026-09-25T00:51:45.201Z",
  updatedAt: "2026-09-25T00:51:47.000Z",
} as const satisfies TemperLoreBook
