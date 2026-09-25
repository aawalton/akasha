import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterForVittoria = {
  id: "01a0d60b-2345-7a26-935a-78150ca2aed0",
  type: "page-type/temper-lore-book",
  slug: "letter-for-vittoria",
  title: "Letter for Vittoria",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5473,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
