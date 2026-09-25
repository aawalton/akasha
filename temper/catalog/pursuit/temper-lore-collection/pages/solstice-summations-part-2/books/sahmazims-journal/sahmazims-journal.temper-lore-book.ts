import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sahmazimsJournal = {
  id: "01a0d60e-45b3-7cc1-8fd2-55bf1dde026a",
  type: "page-type/temper-lore-book",
  slug: "sahmazims-journal",
  title: "Sahmazim's Journal",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8408,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
