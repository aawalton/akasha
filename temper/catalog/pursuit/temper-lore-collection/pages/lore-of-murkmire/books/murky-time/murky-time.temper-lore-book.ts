import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const murkyTime = {
  id: "01a0d5f6-a29a-7fec-9acd-6a3030f4df83",
  type: "page-type/temper-lore-book",
  slug: "murky-time",
  title: "Murky Time",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2822,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
