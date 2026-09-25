import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ourContinuedLabor = {
  id: "01a0d5f6-d68b-7ec1-b015-b45961242822",
  type: "page-type/temper-lore-book",
  slug: "our-continued-labor",
  title: "Our Continued Labor",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3192,
  bookIndex: 99,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
