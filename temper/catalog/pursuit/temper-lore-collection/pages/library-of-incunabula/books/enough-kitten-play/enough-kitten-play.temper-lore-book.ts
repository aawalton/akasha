import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const enoughKittenPlay = {
  id: "01a0d5f8-02f8-7ade-aa9c-013321449040",
  type: "page-type/temper-lore-book",
  slug: "enough-kitten-play",
  title: "Enough Kitten Play!",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5437,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
