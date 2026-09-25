import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToMarillan = {
  id: "01a0d5f4-07b8-71ec-9c38-3384efe1e00b",
  type: "page-type/temper-lore-book",
  slug: "letter-to-marillan",
  title: "Letter to Marillan",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5655,
  bookIndex: 100,
  charted: true,
  quest: 6395,
  positions: "jsonl",
} as const satisfies TemperLoreBook
