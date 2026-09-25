import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersForTheRecruits = {
  id: "01a0d60c-75b5-7fde-a0cf-2c75d4eeebee",
  type: "page-type/temper-lore-book",
  slug: "orders-for-the-recruits",
  title: "Orders for the Recruits",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7018,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
