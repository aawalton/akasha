import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const remansFortune = {
  id: "01a0d5f7-73fa-7178-b7ab-cc233729d694",
  type: "page-type/temper-lore-book",
  slug: "remans-fortune",
  title: "Reman's Fortune",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3711,
  bookIndex: 38,
  charted: true,
  quest: 5664,
  positions: "jsonl",
} as const satisfies TemperLoreBook
