import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whyWeFarm = {
  id: "01a0d5f2-83a4-7f79-87b7-673e27b2ec7e",
  type: "page-type/temper-lore-book",
  slug: "why-we-farm",
  title: "Why We Farm",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 615,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
