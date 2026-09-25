import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const royalMessengersFate = {
  id: "01a0d5f6-d68b-7319-981d-b25a495e6657",
  type: "page-type/temper-lore-book",
  slug: "royal-messengers-fate",
  title: "Royal Messenger's Fate",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2701,
  charted: true,
  quest: 5317,
  positions: "jsonl",
} as const satisfies TemperLoreBook
