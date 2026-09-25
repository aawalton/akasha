import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const elsweyrNeedsYou = {
  id: "01a0d60b-2344-7006-8759-a241e4980175",
  type: "page-type/temper-lore-book",
  slug: "elsweyr-needs-you",
  title: "Elsweyr Needs You!",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5435,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
