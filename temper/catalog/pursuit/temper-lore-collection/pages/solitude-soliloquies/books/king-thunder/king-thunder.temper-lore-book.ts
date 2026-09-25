import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingThunder = {
  id: "01a0d60b-8108-7f3a-af7b-e0d28e3da29e",
  type: "page-type/temper-lore-book",
  slug: "king-thunder",
  title: "King Thunder",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5917,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
