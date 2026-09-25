import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vijariIsUnwell = {
  id: "01a0d60b-4e03-7a92-8b00-3f492831031e",
  type: "page-type/temper-lore-book",
  slug: "vijari-is-unwell",
  title: "Vijari is Unwell",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5702,
  bookIndex: 18,
  charted: true,
  quest: 6396,
  positions: "jsonl",
} as const satisfies TemperLoreBook
