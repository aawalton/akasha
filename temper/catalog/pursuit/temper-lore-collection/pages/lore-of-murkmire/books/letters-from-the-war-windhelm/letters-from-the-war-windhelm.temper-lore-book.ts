import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lettersFromTheWarWindhelm = {
  id: "01a0d5f6-a29a-7d25-bee1-1cdcced8e69a",
  type: "page-type/temper-lore-book",
  slug: "letters-from-the-war-windhelm",
  title: "Letters from the War: Windhelm",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2848,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
