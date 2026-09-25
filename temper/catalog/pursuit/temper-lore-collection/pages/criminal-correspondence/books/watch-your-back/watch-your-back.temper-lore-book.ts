import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const watchYourBack = {
  id: "01a0d5f1-f452-75c4-9499-e8b2eb1098c4",
  type: "page-type/temper-lore-book",
  slug: "watch-your-back",
  title: "Watch Your Back",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1216,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
