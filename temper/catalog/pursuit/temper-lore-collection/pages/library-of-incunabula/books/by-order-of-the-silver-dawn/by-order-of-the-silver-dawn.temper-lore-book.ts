import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const byOrderOfTheSilverDawn = {
  id: "01a0d5f8-02f8-7758-8fad-9ac06873dc67",
  type: "page-type/temper-lore-book",
  slug: "by-order-of-the-silver-dawn",
  title: "By Order of the Silver Dawn",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5037,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
