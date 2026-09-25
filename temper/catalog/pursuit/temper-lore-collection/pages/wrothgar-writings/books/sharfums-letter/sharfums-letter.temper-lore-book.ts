import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sharfumsLetter = {
  id: "01a0d5f6-d68b-72ea-8f32-70921f58936c",
  type: "page-type/temper-lore-book",
  slug: "sharfums-letter",
  title: "Sharfum's Letter",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2780,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
