import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const staffOfTowers = {
  id: "01a0d60a-f1ec-73d2-920d-916da46a36b8",
  type: "page-type/temper-lore-book",
  slug: "staff-of-towers",
  title: "Staff of Towers",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 5273,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
