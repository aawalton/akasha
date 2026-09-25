import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fableOfTheIndrik = {
  id: "01a0d60d-9a63-70f6-8b88-2a3587145041",
  type: "page-type/temper-lore-book",
  slug: "fable-of-the-indrik",
  title: "Fable of the Indrik",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8020,
  bookIndex: 51,
  charted: true,
  quest: 7197,
  positions: "jsonl",
} as const satisfies TemperLoreBook
