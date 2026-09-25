import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jeirmunsWorkLog = {
  id: "01a0d5f7-160b-72c4-a8d9-892c7b4f82fc",
  type: "page-type/temper-lore-book",
  slug: "jeirmuns-work-log",
  title: "Jeirmun's Work Log",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3159,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
