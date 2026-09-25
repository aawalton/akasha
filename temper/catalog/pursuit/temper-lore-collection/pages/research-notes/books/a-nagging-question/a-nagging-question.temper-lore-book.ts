import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aNaggingQuestion = {
  id: "01a0d5f5-1383-7505-9f00-ad1c67f95ca2",
  type: "page-type/temper-lore-book",
  slug: "a-nagging-question",
  title: "A Nagging Question",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1040,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
