import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oldHandbill = {
  id: "01a0d5f2-83a3-78cc-a91b-3093d86e252e",
  type: "page-type/temper-lore-book",
  slug: "old-handbill",
  title: "Old Handbill",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1245,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
