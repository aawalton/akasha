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
} as const satisfies TemperLoreBook
