import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theShipWontLast = {
  id: "01a0d60d-ff6a-7709-8a2d-b7d7ca7bae14",
  type: "page-type/temper-lore-book",
  slug: "the-ship-wont-last",
  title: "The Ship Won't Last",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8120,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
