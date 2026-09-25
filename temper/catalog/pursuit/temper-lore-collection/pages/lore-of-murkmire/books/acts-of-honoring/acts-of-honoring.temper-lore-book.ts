import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const actsOfHonoring = {
  id: "01a0d5f6-a298-7bb6-b414-102fe30de84f",
  type: "page-type/temper-lore-book",
  slug: "acts-of-honoring",
  title: "Acts of Honoring",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5363,
  bookIndex: 94,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
