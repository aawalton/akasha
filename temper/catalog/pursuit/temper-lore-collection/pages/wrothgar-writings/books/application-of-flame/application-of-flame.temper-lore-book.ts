import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const applicationOfFlame = {
  id: "01a0d5f6-d68a-75c6-a860-a5754461d549",
  type: "page-type/temper-lore-book",
  slug: "application-of-flame",
  title: "Application of Flame",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3139,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
