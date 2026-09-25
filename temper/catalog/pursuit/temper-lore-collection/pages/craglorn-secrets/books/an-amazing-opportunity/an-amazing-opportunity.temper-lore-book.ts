import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anAmazingOpportunity = {
  id: "01a0d5f1-c919-70ca-9b9f-36602d8df4a7",
  type: "page-type/temper-lore-book",
  slug: "an-amazing-opportunity",
  title: "An Amazing Opportunity",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2733,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
