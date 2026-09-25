import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const torugAgKrazak = {
  id: "01a0d5f6-d68c-7c35-aa24-5c01a0c5c613",
  type: "page-type/temper-lore-book",
  slug: "torug-ag-krazak",
  title: "Torug ag Krazak",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3033,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
