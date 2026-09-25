import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const azinJosJournal = {
  id: "01a0d60b-2344-72e1-9548-e6c8b536bc50",
  type: "page-type/temper-lore-book",
  slug: "azin-jos-journal",
  title: "Azin-jo's Journal",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5454,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
