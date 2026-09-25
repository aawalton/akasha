import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const masterPythissJournal = {
  id: "01a0d60b-c958-7d7f-8cc6-7e65f83b8505",
  type: "page-type/temper-lore-book",
  slug: "master-pythiss-journal",
  title: "Master Pythis's Journal",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6257,
  bookIndex: 18,
  charted: true,
  quest: 6575,
  positions: "jsonl",
} as const satisfies TemperLoreBook
