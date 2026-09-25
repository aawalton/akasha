import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mendrevalsClue = {
  id: "01a0d5f4-07b8-71c8-9b39-539a1d12650c",
  type: "page-type/temper-lore-book",
  slug: "mendrevals-clue",
  title: "Mendreval's Clue",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2332,
  bookIndex: 67,
  charted: true,
  quest: 4791,
  positions: "jsonl",
} as const satisfies TemperLoreBook
