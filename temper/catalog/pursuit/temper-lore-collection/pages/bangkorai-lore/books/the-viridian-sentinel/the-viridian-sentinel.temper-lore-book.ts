import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theViridianSentinel = {
  id: "01a0d5e3-196a-7393-9048-c96e11ec3167",
  type: "page-type/temper-lore-book",
  slug: "the-viridian-sentinel",
  title: "The Viridian Sentinel",
  collection: "temper-lore-collection/bangkorai-lore",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
