import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fargraveACityOfMyth = {
  id: "01a0d60d-156d-74aa-9a25-e14d678f8c07",
  type: "page-type/temper-lore-book",
  slug: "fargrave-a-city-of-myth",
  title: "Fargrave: A City of Myth",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7556,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
