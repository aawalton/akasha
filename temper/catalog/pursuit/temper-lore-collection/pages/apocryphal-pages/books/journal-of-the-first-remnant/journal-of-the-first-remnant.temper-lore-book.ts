import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfTheFirstRemnant = {
  id: "01a0d60d-156e-79fa-8ef5-a27ab133cbb6",
  type: "page-type/temper-lore-book",
  slug: "journal-of-the-first-remnant",
  title: "Journal of the First Remnant",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7776,
  bookIndex: 68,
  charted: true,
  quest: 6992,
  positions: "jsonl",
  createdAt: "2026-09-25T00:52:56.814Z",
  updatedAt: "2026-09-25T00:52:58.000Z",
} as const satisfies TemperLoreBook
