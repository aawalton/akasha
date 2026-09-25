import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const felhorn = {
  id: "01a0d5f3-3fda-7756-9d8c-6441933093ad",
  type: "page-type/temper-lore-book",
  slug: "felhorn",
  title: "Felhorn",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1109,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
