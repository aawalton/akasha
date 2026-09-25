import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const catalogOfTomesAndManuscripts = {
  id: "01a0d5f6-d68a-7779-bfc7-f33df3ae6cf9",
  type: "page-type/temper-lore-book",
  slug: "catalog-of-tomes-and-manuscripts",
  title: "Catalog of Tomes and Manuscripts",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3196,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
