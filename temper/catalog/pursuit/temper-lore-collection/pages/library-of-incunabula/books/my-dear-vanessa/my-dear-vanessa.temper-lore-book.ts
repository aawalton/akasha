import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const myDearVanessa = {
  id: "01a0d5f8-02f9-770a-8779-35d3671af8e3",
  type: "page-type/temper-lore-book",
  slug: "my-dear-vanessa",
  title: "My Dear Vanessa",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6862,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
