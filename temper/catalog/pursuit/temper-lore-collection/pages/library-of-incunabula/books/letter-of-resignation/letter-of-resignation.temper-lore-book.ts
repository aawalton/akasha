import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterOfResignation = {
  id: "01a0d5f8-02f8-772f-a269-26c67e4d434d",
  type: "page-type/temper-lore-book",
  slug: "letter-of-resignation",
  title: "Letter of Resignation",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7477,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
