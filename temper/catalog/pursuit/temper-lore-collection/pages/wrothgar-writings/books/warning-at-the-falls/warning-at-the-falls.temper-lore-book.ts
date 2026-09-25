import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warningAtTheFalls = {
  id: "01a0d5f6-d68c-7413-b123-2fbacf022b66",
  type: "page-type/temper-lore-book",
  slug: "warning-at-the-falls",
  title: "Warning at the Falls",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3195,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
