import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const allAlone = {
  id: "01a0d5f6-45ad-7127-ad2a-9f05a059c707",
  type: "page-type/temper-lore-book",
  slug: "all-alone",
  title: "All Alone",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1220,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
