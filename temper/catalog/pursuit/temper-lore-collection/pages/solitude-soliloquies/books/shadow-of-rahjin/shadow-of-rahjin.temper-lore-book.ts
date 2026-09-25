import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shadowOfRahjin = {
  id: "01a0d60b-8109-73a1-a359-3e7b5209e3ea",
  type: "page-type/temper-lore-book",
  slug: "shadow-of-rahjin",
  title: "Shadow of Rahjin",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5906,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
