import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const palithNote = {
  id: "01a0d5f4-07b8-7bfc-b955-df6e4c1df751",
  type: "page-type/temper-lore-book",
  slug: "palith-note",
  title: "Palith Note",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 780,
  bookIndex: 14,
  charted: true,
  quest: 4326,
  positions: "jsonl",
} as const satisfies TemperLoreBook
