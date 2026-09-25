import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const merchantsScoundrelsThieves = {
  id: "01a0d5f1-c91a-769c-8d0a-72fa8b4f3975",
  type: "page-type/temper-lore-book",
  slug: "merchants-scoundrels-thieves",
  title: "Merchants, Scoundrels, Thieves",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2583,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
