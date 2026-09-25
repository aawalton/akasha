import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainsNote = {
  id: "01a0d5f4-07b7-71ba-90b0-8eaddbecebfc",
  type: "page-type/temper-lore-book",
  slug: "captains-note",
  title: "Captain's Note",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 4059,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
