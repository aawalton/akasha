import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfBravamLythandas = {
  id: "01a0d5f5-1384-7156-8ef8-d6aa32bf2c90",
  type: "page-type/temper-lore-book",
  slug: "journal-of-bravam-lythandas",
  title: "Journal of Bravam Lythandas",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1447,
  bookIndex: 57,
  charted: true,
  quest: 4667,
  positions: "jsonl",
} as const satisfies TemperLoreBook
