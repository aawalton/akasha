import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dradeivasJournal = {
  id: "01a0d5f6-a299-78fc-bcb3-55c250f01afd",
  type: "page-type/temper-lore-book",
  slug: "dradeivas-journal",
  title: "Dradeiva's Journal",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5298,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
