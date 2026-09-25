import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSummoner = {
  id: "01a0d5f6-1c16-76c6-a3e6-cbf08712e919",
  type: "page-type/temper-lore-book",
  slug: "the-summoner",
  title: "The Summoner",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 938,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
