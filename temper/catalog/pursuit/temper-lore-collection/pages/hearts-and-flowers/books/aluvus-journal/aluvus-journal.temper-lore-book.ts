import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aluvusJournal = {
  id: "01a0d5f2-af6f-7920-85c5-97535c684a89",
  type: "page-type/temper-lore-book",
  slug: "aluvus-journal",
  title: "Aluvus' Journal",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1257,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
