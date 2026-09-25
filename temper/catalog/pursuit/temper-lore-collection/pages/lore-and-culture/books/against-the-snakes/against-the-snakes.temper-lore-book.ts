import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const againstTheSnakes = {
  id: "01a0d5f3-3fda-7dff-b982-ac31a4ab831d",
  type: "page-type/temper-lore-book",
  slug: "against-the-snakes",
  title: "Against the Snakes",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 351,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
