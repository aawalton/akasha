import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterOfExecution = {
  id: "01a0d5f8-02f8-7439-bc52-405e702edd97",
  type: "page-type/temper-lore-book",
  slug: "letter-of-execution",
  title: "Letter of Execution",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6863,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
