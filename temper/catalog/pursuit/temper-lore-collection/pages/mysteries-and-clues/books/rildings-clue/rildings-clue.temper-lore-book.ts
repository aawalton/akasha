import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rildingsClue = {
  id: "01a0d5f4-07b8-7864-993a-6a49644511c5",
  type: "page-type/temper-lore-book",
  slug: "rildings-clue",
  title: "Rilding's Clue",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2333,
  bookIndex: 68,
  charted: true,
  quest: 4791,
  positions: "jsonl",
} as const satisfies TemperLoreBook
