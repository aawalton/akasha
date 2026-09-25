import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const once = {
  id: "01a0d5e2-efe8-7012-bc8c-0a700701ea58",
  type: "page-type/temper-lore-book",
  slug: "once",
  title: "Once",
  collection: "temper-lore-collection/stormhaven-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
