import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const waitTillNextTime = {
  id: "01a0d5f3-3fdc-7c40-8937-1a7987748569",
  type: "page-type/temper-lore-book",
  slug: "wait-till-next-time",
  title: "Wait Till Next Time",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1250,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
