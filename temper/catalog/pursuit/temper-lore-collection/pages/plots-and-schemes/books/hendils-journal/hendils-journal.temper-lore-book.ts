import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hendilsJournal = {
  id: "01a0d5f4-c388-74f0-af82-d684a14c858c",
  type: "page-type/temper-lore-book",
  slug: "hendils-journal",
  title: "Hendil's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 559,
  bookIndex: 15,
  charted: true,
  quest: 4266,
  positions: "jsonl",
} as const satisfies TemperLoreBook
