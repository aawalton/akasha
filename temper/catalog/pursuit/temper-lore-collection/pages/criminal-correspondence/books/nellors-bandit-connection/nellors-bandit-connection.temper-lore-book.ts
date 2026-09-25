import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nellorsBanditConnection = {
  id: "01a0d5f1-f451-7a77-9964-671b13533efa",
  type: "page-type/temper-lore-book",
  slug: "nellors-bandit-connection",
  title: "Nellor's Bandit Connection",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1750,
  bookIndex: 67,
  charted: true,
  quest: 4786,
  positions: "jsonl",
} as const satisfies TemperLoreBook
