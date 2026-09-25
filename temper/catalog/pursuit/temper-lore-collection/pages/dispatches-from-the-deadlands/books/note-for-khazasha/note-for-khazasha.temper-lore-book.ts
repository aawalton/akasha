import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteForKhazasha = {
  id: "01a0d60c-40c0-7ffe-90a3-669ac34a7f06",
  type: "page-type/temper-lore-book",
  slug: "note-for-khazasha",
  title: "Note for Khazasha",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6924,
  bookIndex: 29,
  charted: true,
  quest: 6705,
  positions: "jsonl",
} as const satisfies TemperLoreBook
