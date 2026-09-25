import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cheesesOfTamriel = {
  id: "01a0d5f3-3fda-7061-b09e-9fa471ed1db6",
  type: "page-type/temper-lore-book",
  slug: "cheeses-of-tamriel",
  title: "Cheeses of Tamriel",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1145,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
