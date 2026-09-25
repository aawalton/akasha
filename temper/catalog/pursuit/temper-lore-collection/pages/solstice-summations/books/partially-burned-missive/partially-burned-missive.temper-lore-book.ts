import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const partiallyBurnedMissive = {
  id: "01a0d60d-ff6a-7683-8fde-77725b7bb27e",
  type: "page-type/temper-lore-book",
  slug: "partially-burned-missive",
  title: "Partially Burned Missive",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8306,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
