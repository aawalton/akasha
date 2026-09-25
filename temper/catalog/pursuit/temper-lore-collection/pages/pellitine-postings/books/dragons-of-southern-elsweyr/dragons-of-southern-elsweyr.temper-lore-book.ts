import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dragonsOfSouthernElsweyr = {
  id: "01a0d60b-4e02-785e-824f-d0d00a496dd6",
  type: "page-type/temper-lore-book",
  slug: "dragons-of-southern-elsweyr",
  title: "Dragons of Southern Elsweyr",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5851,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
