import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anUnusualHare = {
  id: "01a0d5f8-02f7-772c-9b67-2ff5669cff1c",
  type: "page-type/temper-lore-book",
  slug: "an-unusual-hare",
  title: "An Unusual Hare",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5047,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
