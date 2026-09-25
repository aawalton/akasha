import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yourNewTarget = {
  id: "01a0d60d-156e-783f-9b86-5b9d737e2720",
  type: "page-type/temper-lore-book",
  slug: "your-new-target",
  title: "Your New Target",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7631,
  bookIndex: 61,
  charted: true,
  quest: 6996,
  positions: "jsonl",
} as const satisfies TemperLoreBook
