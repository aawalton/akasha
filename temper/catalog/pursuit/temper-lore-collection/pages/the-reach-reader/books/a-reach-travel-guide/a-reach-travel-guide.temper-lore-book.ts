import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aReachTravelGuide = {
  id: "01a0d60b-c957-71b4-bcd3-8a57eef6f350",
  type: "page-type/temper-lore-book",
  slug: "a-reach-travel-guide",
  title: "A Reach Travel Guide",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 5965,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
