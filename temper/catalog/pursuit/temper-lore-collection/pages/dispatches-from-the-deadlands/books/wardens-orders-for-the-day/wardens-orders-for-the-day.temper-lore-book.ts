import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wardensOrdersForTheDay = {
  id: "01a0d60c-40c1-7c8d-870a-ac5bf91cb8d4",
  type: "page-type/temper-lore-book",
  slug: "wardens-orders-for-the-day",
  title: "Warden's Orders for the Day",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6868,
  bookIndex: 8,
  charted: true,
  quest: 6707,
  positions: "jsonl",
} as const satisfies TemperLoreBook
