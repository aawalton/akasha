import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromFiruin = {
  id: "01a0d5f5-abba-75b0-a53a-4ffaa6fe8caa",
  type: "page-type/temper-lore-book",
  slug: "note-from-firuin",
  title: "Note from Firuin",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 466,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
