import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const malofarsJournal = {
  id: "01a0d5f4-c388-7142-adb0-5835032f3c1d",
  type: "page-type/temper-lore-book",
  slug: "malofars-journal",
  title: "Malofar's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 2005,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
