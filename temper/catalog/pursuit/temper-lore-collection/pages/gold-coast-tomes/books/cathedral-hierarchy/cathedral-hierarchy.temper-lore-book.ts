import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cathedralHierarchy = {
  id: "01a0d5f7-73f9-74e2-8182-618ae7bc309a",
  type: "page-type/temper-lore-book",
  slug: "cathedral-hierarchy",
  title: "Cathedral Hierarchy",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3677,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
