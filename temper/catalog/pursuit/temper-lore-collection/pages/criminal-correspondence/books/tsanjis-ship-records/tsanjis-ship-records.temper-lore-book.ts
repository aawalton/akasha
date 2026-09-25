import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tsanjisShipRecords = {
  id: "01a0d5f1-f452-7f1a-9f1e-09089a291dbf",
  type: "page-type/temper-lore-book",
  slug: "tsanjis-ship-records",
  title: "Tsanji's Ship Records",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 974,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
