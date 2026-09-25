import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shomaesJournal = {
  id: "01a0d60b-2345-7150-bede-23db7f85d2f8",
  type: "page-type/temper-lore-book",
  slug: "shomaes-journal",
  title: "Shomae's Journal",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5635,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
