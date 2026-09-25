import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whatAPigNeeds = {
  id: "01a0d5f2-db27-7a54-b0a7-16e5164f9123",
  type: "page-type/temper-lore-book",
  slug: "what-a-pig-needs",
  title: "What a Pig Needs",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 683,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
