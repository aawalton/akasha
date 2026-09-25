import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingRansersTirade = {
  id: "01a0d5f2-509f-739a-9174-ea9407ad6596",
  type: "page-type/temper-lore-book",
  slug: "king-ransers-tirade",
  title: "King Ranser's Tirade",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2004,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
