import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shrineOfMara = {
  id: "01a0d5f2-83a3-7fd3-8c1a-22c77655f0ce",
  type: "page-type/temper-lore-book",
  slug: "shrine-of-mara",
  title: "Shrine of Mara",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2561,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
