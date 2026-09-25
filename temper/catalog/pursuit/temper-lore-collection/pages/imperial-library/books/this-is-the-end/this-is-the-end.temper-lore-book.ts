import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thisIsTheEnd = {
  id: "01a0d5f6-f385-7f33-96e4-cdabecf465c6",
  type: "page-type/temper-lore-book",
  slug: "this-is-the-end",
  title: "This is the End",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 2901,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
