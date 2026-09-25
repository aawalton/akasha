import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const messageToJena = {
  id: "01a0d5f1-f451-7eba-bb4c-d5926218bf5a",
  type: "page-type/temper-lore-book",
  slug: "message-to-jena",
  title: "Message to Jena",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1755,
  bookIndex: 68,
  charted: true,
  quest: 4674,
  positions: "jsonl",
} as const satisfies TemperLoreBook
