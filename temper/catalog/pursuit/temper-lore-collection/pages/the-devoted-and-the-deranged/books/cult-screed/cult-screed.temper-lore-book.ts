import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cultScreed = {
  id: "01a0d5f5-abb9-7a9e-8ca0-aaa8d353af87",
  type: "page-type/temper-lore-book",
  slug: "cult-screed",
  title: "Cult Screed",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 122,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
