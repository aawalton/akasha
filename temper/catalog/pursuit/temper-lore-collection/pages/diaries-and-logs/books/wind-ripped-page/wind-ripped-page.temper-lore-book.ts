import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const windRippedPage = {
  id: "01a0d5f2-509f-725c-ad62-a444b0f8df0d",
  type: "page-type/temper-lore-book",
  slug: "wind-ripped-page",
  title: "Wind-Ripped Page",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1565,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
