import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rakamudsLetter = {
  id: "01a0d5f3-0ef8-791a-8bc2-cee52c91a0bf",
  type: "page-type/temper-lore-book",
  slug: "rakamuds-letter",
  title: "Rakamud's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1572,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
