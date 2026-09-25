import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainSauliniasInstructions = {
  id: "01a0d60b-2344-7af2-a1b7-0e1b89c4ec64",
  type: "page-type/temper-lore-book",
  slug: "captain-saulinias-instructions",
  title: "Captain Saulinia's Instructions",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5421,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
