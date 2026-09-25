import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGoodBits = {
  id: "01a0d60b-4e03-759a-983d-c2bbee06856a",
  type: "page-type/temper-lore-book",
  slug: "the-good-bits",
  title: "The Good Bits",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5735,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
