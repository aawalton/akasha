import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBookOfDaedra = {
  id: "01a0d5e4-2557-71f4-83f3-a5733792e290",
  type: "page-type/temper-lore-book",
  slug: "the-book-of-daedra",
  title: "The Book of Daedra",
  collection: "temper-lore-collection/oblivion-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
  createdAt: "2026-09-25T00:08:13.911Z",
  updatedAt: "2026-09-25T00:08:14.000Z",
} as const satisfies TemperLoreBook
