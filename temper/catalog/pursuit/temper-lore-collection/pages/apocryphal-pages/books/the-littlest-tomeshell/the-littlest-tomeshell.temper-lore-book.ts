import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLittlestTomeshell = {
  id: "01a0d60d-156e-7821-bd21-7bdcb85f3500",
  type: "page-type/temper-lore-book",
  slug: "the-littlest-tomeshell",
  title: "The Littlest Tomeshell",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7455,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
