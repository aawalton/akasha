import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const emperorKastavsEpitaph = {
  id: "01a0d5f6-a299-789f-b651-8e9d96d80492",
  type: "page-type/temper-lore-book",
  slug: "emperor-kastavs-epitaph",
  title: "Emperor Kastav's Epitaph",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5384,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
