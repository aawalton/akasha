import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const upHighNote = {
  id: "01a0d5f7-73fb-7864-959c-4b7f7d191f68",
  type: "page-type/temper-lore-book",
  slug: "up-high-note",
  title: "Up High Note",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3666,
  bookIndex: 35,
  charted: true,
  quest: 5664,
  positions: "jsonl",
} as const satisfies TemperLoreBook
