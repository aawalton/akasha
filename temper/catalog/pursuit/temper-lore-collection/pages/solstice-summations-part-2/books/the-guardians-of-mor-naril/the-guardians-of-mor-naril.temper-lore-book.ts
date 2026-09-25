import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGuardiansOfMorNaril = {
  id: "01a0d60e-45b3-7d41-b2f7-b69ff241a626",
  type: "page-type/temper-lore-book",
  slug: "the-guardians-of-mor-naril",
  title: "The Guardians of Mor Naril",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8446,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
