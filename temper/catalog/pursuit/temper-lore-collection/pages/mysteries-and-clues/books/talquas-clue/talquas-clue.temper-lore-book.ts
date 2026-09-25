import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const talquasClue = {
  id: "01a0d5f4-07b9-71b6-ab38-f0f325d931fa",
  type: "page-type/temper-lore-book",
  slug: "talquas-clue",
  title: "Talqua's Clue",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2334,
  bookIndex: 69,
  charted: true,
  quest: 4791,
  positions: "jsonl",
} as const satisfies TemperLoreBook
