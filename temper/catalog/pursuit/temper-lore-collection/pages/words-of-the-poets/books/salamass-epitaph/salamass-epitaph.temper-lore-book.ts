import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const salamassEpitaph = {
  id: "01a0d5f6-1c16-74cf-b91b-c0a4ae50b410",
  type: "page-type/temper-lore-book",
  slug: "salamass-epitaph",
  title: "Salamas's Epitaph",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 2827,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
