import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToLauriel = {
  id: "01a0d60a-d5bd-7ada-9ad5-73422c5a24c5",
  type: "page-type/temper-lore-book",
  slug: "letter-to-lauriel",
  title: "Letter to Lauriel",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4907,
  bookIndex: 89,
  charted: true,
  quest: 6118,
  positions: "jsonl",
} as const satisfies TemperLoreBook
