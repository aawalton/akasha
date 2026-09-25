import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const missiveToAlchemist = {
  id: "01a0d5f4-c388-7bd9-b07a-692998ba34f9",
  type: "page-type/temper-lore-book",
  slug: "missive-to-alchemist",
  title: "Missive to Alchemist",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 881,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
