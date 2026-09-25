import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const henrisJournal = {
  id: "01a0d5f4-6f1a-76ea-94a0-00e1124643d3",
  type: "page-type/temper-lore-book",
  slug: "henris-journal",
  title: "Henri's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 409,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
