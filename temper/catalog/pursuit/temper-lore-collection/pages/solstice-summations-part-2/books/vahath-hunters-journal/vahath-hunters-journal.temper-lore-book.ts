import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vahathHuntersJournal = {
  id: "01a0d60e-45b3-774e-89b3-19bc6095fa5a",
  type: "page-type/temper-lore-book",
  slug: "vahath-hunters-journal",
  title: "Vahath Hunter's Journal",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8567,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
