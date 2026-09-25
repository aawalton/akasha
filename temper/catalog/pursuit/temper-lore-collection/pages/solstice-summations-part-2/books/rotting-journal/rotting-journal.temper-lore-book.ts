import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rottingJournal = {
  id: "01a0d60e-45b3-7151-bb38-6dae291730da",
  type: "page-type/temper-lore-book",
  slug: "rotting-journal",
  title: "Rotting Journal",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8564,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
