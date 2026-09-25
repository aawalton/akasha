import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orcsCouldBeWorse = {
  id: "01a0d5f3-3fdb-7ee9-bb2a-b72fea40c2cb",
  type: "page-type/temper-lore-book",
  slug: "orcs-could-be-worse",
  title: "Orcs? Could Be Worse",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1231,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
