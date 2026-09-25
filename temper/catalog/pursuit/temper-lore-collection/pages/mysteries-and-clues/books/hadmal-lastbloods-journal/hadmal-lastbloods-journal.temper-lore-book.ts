import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hadmalLastbloodsJournal = {
  id: "01a0d5f4-07b8-7b65-8da7-1e37a8137604",
  type: "page-type/temper-lore-book",
  slug: "hadmal-lastbloods-journal",
  title: "Hadmal Lastblood's Journal",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 499,
  bookIndex: 11,
  charted: true,
  quest: 4212,
  positions: "jsonl",
} as const satisfies TemperLoreBook
