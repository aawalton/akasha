import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSharpestBlade = {
  id: "01a0d5f3-0ef9-7f9e-8e47-43b60d7c1bc1",
  type: "page-type/temper-lore-book",
  slug: "the-sharpest-blade",
  title: "The Sharpest Blade",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1017,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
