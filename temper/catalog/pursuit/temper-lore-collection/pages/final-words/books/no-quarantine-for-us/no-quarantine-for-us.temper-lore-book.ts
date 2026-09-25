import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noQuarantineForUs = {
  id: "01a0d5f6-45ae-7528-b637-c9b5ad394ea6",
  type: "page-type/temper-lore-book",
  slug: "no-quarantine-for-us",
  title: "No Quarantine for Us",
  collection: "temper-lore-collection/final-words",
  esoBookId: 455,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
