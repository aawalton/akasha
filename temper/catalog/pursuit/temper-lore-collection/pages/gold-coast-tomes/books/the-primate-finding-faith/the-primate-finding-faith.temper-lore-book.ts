import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePrimateFindingFaith = {
  id: "01a0d5f7-73fb-7a6d-8d06-805b3de2f7c4",
  type: "page-type/temper-lore-book",
  slug: "the-primate-finding-faith",
  title: "The Primate: Finding Faith",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3262,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
