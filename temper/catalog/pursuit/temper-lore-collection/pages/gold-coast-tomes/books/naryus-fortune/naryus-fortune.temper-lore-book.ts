import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const naryusFortune = {
  id: "01a0d5f7-73fa-7d9d-b849-d9c101a32167",
  type: "page-type/temper-lore-book",
  slug: "naryus-fortune",
  title: "Naryu's Fortune",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3712,
  bookIndex: 39,
  charted: true,
  quest: 5664,
  positions: "jsonl",
} as const satisfies TemperLoreBook
