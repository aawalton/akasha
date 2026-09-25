import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToFirilia = {
  id: "01a0d5f2-af70-7056-b17c-1674e9658262",
  type: "page-type/temper-lore-book",
  slug: "letter-to-firilia",
  title: "Letter to Firilia",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1212,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
