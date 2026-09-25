import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theColorfulKhajiit = {
  id: "01a0d60b-4e03-7108-abc3-f5b761cf24fa",
  type: "page-type/temper-lore-book",
  slug: "the-colorful-khajiit",
  title: "The Colorful Khajiit",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5661,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
