import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainIzadsLetter = {
  id: "01a0d5f4-07b7-7d60-8dd8-d122e3b5439d",
  type: "page-type/temper-lore-book",
  slug: "captain-izads-letter",
  title: "Captain Izad's Letter",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1074,
  bookIndex: 27,
  charted: true,
  quest: 4471,
  positions: "jsonl",
} as const satisfies TemperLoreBook
