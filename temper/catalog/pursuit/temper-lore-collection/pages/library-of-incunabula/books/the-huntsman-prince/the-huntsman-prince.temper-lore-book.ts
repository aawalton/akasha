import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHuntsmanPrince = {
  id: "01a0d5f8-02f9-703c-bb95-7a47efd37477",
  type: "page-type/temper-lore-book",
  slug: "the-huntsman-prince",
  title: "The Huntsman Prince",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5044,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
