import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const voidprowlerJournal = {
  id: "01a0d60d-156e-74f6-ad44-edb2b0d284ad",
  type: "page-type/temper-lore-book",
  slug: "voidprowler-journal",
  title: "Voidprowler Journal",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7628,
  bookIndex: 60,
  charted: true,
  quest: 6996,
  positions: "jsonl",
  createdAt: "2026-09-25T00:52:56.814Z",
  updatedAt: "2026-09-25T00:52:58.000Z",
} as const satisfies TemperLoreBook
