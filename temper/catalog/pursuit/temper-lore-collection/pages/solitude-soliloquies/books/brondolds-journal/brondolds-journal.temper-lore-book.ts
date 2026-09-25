import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const brondoldsJournal = {
  id: "01a0d60b-8107-7839-a840-f175b0e0312f",
  type: "page-type/temper-lore-book",
  slug: "brondolds-journal",
  title: "Brondold's Journal",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5913,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
