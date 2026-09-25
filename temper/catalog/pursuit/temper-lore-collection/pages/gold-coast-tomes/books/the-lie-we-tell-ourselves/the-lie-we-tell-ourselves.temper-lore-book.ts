import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLieWeTellOurselves = {
  id: "01a0d5f7-73fb-7589-aa52-39b3ae7a2567",
  type: "page-type/temper-lore-book",
  slug: "the-lie-we-tell-ourselves",
  title: "The Lie We Tell Ourselves",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3279,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
