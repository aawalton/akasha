import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlackQuill = {
  id: "01a0d5f6-d68b-7bc0-bf1b-13bc23620120",
  type: "page-type/temper-lore-book",
  slug: "the-black-quill",
  title: "The Black Quill",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3125,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
