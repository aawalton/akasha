import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reynilasJournal = {
  id: "01a0d60c-eb9c-7b82-bd68-5df74a52c441",
  type: "page-type/temper-lore-book",
  slug: "reynilas-journal",
  title: "Reynila's Journal",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7675,
  bookIndex: 80,
  charted: true,
  quest: 7019,
  positions: "jsonl",
} as const satisfies TemperLoreBook
