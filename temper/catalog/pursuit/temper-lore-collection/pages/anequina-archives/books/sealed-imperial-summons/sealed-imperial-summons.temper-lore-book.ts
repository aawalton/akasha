import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sealedImperialSummons = {
  id: "01a0d60b-2345-701e-9fba-dd9f03139457",
  type: "page-type/temper-lore-book",
  slug: "sealed-imperial-summons",
  title: "Sealed Imperial Summons",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5404,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
