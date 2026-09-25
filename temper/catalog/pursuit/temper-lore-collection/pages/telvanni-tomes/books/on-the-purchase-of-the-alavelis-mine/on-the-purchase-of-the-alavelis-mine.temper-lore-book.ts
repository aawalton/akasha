import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onThePurchaseOfTheAlavelisMine = {
  id: "01a0d60c-eb9c-79a3-ad71-c56b07b90d48",
  type: "page-type/temper-lore-book",
  slug: "on-the-purchase-of-the-alavelis-mine",
  title: "On the Purchase of the Alavelis Mine",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7574,
  bookIndex: 17,
  charted: true,
  quest: 6974,
  positions: "jsonl",
} as const satisfies TemperLoreBook
