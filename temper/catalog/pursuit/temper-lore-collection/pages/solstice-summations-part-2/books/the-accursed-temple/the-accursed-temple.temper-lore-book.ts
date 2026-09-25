import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAccursedTemple = {
  id: "01a0d60e-45b3-75c9-b594-80298aec25bd",
  type: "page-type/temper-lore-book",
  slug: "the-accursed-temple",
  title: "The Accursed Temple",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8597,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
