import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ashlanderWiseWomen = {
  id: "01a0d5f3-3fda-7d64-b4eb-650ad2fe1937",
  type: "page-type/temper-lore-book",
  slug: "ashlander-wise-women",
  title: "Ashlander Wise Women",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 605,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
