import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const alone = {
  id: "01a0d5f2-af6f-7d75-97f0-bb561b17eed5",
  type: "page-type/temper-lore-book",
  slug: "alone",
  title: "Alone",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 118,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
