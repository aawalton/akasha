import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const promissoryNote = {
  id: "01a0d5f2-db26-7903-bd76-65c6216f94b5",
  type: "page-type/temper-lore-book",
  slug: "promissory-note",
  title: "Promissory Note",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1385,
  bookIndex: 50,
  charted: true,
  quest: 4631,
  positions: "jsonl",
} as const satisfies TemperLoreBook
