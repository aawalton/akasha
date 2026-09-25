import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const indirimsJournalAssembled = {
  id: "01a0d60a-d5bc-746c-a713-a9976fd0b92e",
  type: "page-type/temper-lore-book",
  slug: "indirims-journal-assembled",
  title: "Indirim's Journal, Assembled",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5007,
  bookIndex: 20,
  charted: true,
  quest: 6165,
  positions: "jsonl",
} as const satisfies TemperLoreBook
