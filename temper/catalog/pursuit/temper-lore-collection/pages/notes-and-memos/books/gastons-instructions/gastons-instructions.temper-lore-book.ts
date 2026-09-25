import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gastonsInstructions = {
  id: "01a0d5f4-3c11-7b36-a660-33a710a50d83",
  type: "page-type/temper-lore-book",
  slug: "gastons-instructions",
  title: "Gaston's Instructions",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1868,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
