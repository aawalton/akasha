import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lizards = {
  id: "01a0d5f5-1385-7088-ad50-74db4c923172",
  type: "page-type/temper-lore-book",
  slug: "lizards",
  title: "Lizards",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 2510,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
