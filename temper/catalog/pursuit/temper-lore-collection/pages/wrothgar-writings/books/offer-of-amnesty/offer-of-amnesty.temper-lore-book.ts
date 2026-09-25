import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const offerOfAmnesty = {
  id: "01a0d5f6-d68b-76c8-82a7-a6dd03a9c481",
  type: "page-type/temper-lore-book",
  slug: "offer-of-amnesty",
  title: "Offer of Amnesty",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2703,
  bookIndex: 9,
  charted: true,
  quest: 5317,
  positions: "jsonl",
} as const satisfies TemperLoreBook
