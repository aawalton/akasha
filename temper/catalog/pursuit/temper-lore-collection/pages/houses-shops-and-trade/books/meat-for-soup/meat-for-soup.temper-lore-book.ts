import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const meatForSoup = {
  id: "01a0d5f2-db26-7bbe-8e0f-fea29e85fe87",
  type: "page-type/temper-lore-book",
  slug: "meat-for-soup",
  title: "Meat for Soup",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1299,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
