import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const brondoldsPapers = {
  id: "01a0d60b-8107-7f93-8956-3f56e03a34b6",
  type: "page-type/temper-lore-book",
  slug: "brondolds-papers",
  title: "Brondold's Papers",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5898,
  bookIndex: 12,
  charted: true,
  onBookshelves: true,
  quest: 6467,
  positions: "jsonl",
  createdAt: "2026-09-25T00:51:13.287Z",
  updatedAt: "2026-09-25T00:51:15.000Z",
} as const satisfies TemperLoreBook
