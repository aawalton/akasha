import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToOrzorga = {
  id: "01a0d5f7-160b-71fe-8090-1dfe714ec35c",
  type: "page-type/temper-lore-book",
  slug: "letter-to-orzorga",
  title: "Letter to Orzorga",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3223,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
