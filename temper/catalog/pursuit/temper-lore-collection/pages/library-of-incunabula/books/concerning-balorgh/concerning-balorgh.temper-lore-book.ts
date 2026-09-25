import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const concerningBalorgh = {
  id: "01a0d5f8-02f8-7739-877f-e7b3a8067c72",
  type: "page-type/temper-lore-book",
  slug: "concerning-balorgh",
  title: "Concerning Balorgh",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5049,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
