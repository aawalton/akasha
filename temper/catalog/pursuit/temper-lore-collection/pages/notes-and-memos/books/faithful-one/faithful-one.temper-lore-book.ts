import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const faithfulOne = {
  id: "01a0d5f4-3c11-7b41-a465-221de4e9f5b9",
  type: "page-type/temper-lore-book",
  slug: "faithful-one",
  title: "Faithful One",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2501,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
