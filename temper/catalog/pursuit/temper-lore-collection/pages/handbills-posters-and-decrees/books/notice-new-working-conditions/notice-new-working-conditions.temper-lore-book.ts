import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noticeNewWorkingConditions = {
  id: "01a0d5f2-83a2-74b5-8402-9cf94f8f234d",
  type: "page-type/temper-lore-book",
  slug: "notice-new-working-conditions",
  title: "Notice: New Working Conditions",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1601,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
