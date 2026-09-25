import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deckhandsLog = {
  id: "01a0d5f1-f451-7cc8-a56c-de88eb677503",
  type: "page-type/temper-lore-book",
  slug: "deckhands-log",
  title: "Deckhand's Log",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1382,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
