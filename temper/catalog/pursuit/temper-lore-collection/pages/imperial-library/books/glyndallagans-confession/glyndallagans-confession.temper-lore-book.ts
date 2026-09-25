import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const glyndallagansConfession = {
  id: "01a0d5f6-f385-73bd-9230-332f565635a1",
  type: "page-type/temper-lore-book",
  slug: "glyndallagans-confession",
  title: "Glyndallagan's Confession",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 3155,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
