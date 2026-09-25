import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheIvoryBrigade = {
  id: "01a0d60b-fdb0-77cb-bc4b-05de92c59a01",
  type: "page-type/temper-lore-book",
  slug: "on-the-ivory-brigade",
  title: "On the Ivory Brigade",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6746,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
