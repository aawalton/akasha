import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const grayMireTribalLeadership = {
  id: "01a0d5f2-db26-7662-a68b-776ac79b9ef4",
  type: "page-type/temper-lore-book",
  slug: "gray-mire-tribal-leadership",
  title: "Gray Mire Tribal Leadership",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1924,
  bookIndex: 74,
  charted: true,
  quest: 4768,
  positions: "jsonl",
} as const satisfies TemperLoreBook
