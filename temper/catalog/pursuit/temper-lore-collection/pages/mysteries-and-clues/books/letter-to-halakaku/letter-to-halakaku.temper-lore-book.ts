import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToHalakaku = {
  id: "01a0d5f4-07b8-7064-89f1-402e8f4694f5",
  type: "page-type/temper-lore-book",
  slug: "letter-to-halakaku",
  title: "Letter to Halakaku",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5699,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
