import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLostFortFaleria = {
  id: "01a0d5f7-73fb-7824-a688-69f6a25b5af3",
  type: "page-type/temper-lore-book",
  slug: "the-lost-fort-faleria",
  title: "The Lost Fort Faleria",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3708,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
