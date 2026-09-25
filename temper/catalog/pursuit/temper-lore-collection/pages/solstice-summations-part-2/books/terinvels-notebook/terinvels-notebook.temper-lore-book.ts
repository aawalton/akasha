import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const terinvelsNotebook = {
  id: "01a0d60e-45b3-7aa9-a3eb-0d9738f042a1",
  type: "page-type/temper-lore-book",
  slug: "terinvels-notebook",
  title: "Terinvel's Notebook",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8552,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
