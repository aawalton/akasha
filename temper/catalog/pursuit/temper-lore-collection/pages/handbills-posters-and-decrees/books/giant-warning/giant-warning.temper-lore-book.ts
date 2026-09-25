import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const giantWarning = {
  id: "01a0d5f2-83a2-7448-b631-3d9c3fba9514",
  type: "page-type/temper-lore-book",
  slug: "giant-warning",
  title: "Giant Warning",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 882,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
