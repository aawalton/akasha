import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const litanyOfBloodFulfilled = {
  id: "01a0d5f7-73fa-7026-8c94-f139b9e9940f",
  type: "page-type/temper-lore-book",
  slug: "litany-of-blood-fulfilled",
  title: "Litany of Blood Fulfilled",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3517,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
