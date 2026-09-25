import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCrownedDragon = {
  id: "01a0d5f8-02f9-7749-9539-d6beb974d02b",
  type: "page-type/temper-lore-book",
  slug: "the-crowned-dragon",
  title: "The Crowned Dragon",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6262,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
