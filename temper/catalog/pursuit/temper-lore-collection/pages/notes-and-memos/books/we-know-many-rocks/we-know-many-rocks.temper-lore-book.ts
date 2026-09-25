import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const weKnowManyRocks = {
  id: "01a0d5f4-3c13-7781-b3be-6aaea29d7246",
  type: "page-type/temper-lore-book",
  slug: "we-know-many-rocks",
  title: "We Know, Many-Rocks",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2503,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
