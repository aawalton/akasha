import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const iveHadIt = {
  id: "01a0d60e-687f-71e9-a859-0758c430c57d",
  type: "page-type/temper-lore-book",
  slug: "ive-had-it",
  title: "I've Had It",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8723,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
