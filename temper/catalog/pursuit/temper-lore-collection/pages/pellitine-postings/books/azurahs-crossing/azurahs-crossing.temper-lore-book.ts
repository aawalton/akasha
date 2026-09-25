import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const azurahsCrossing = {
  id: "01a0d60b-4e01-750b-8fcb-ea6749463bb6",
  type: "page-type/temper-lore-book",
  slug: "azurahs-crossing",
  title: "Azurah's Crossing",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5873,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
