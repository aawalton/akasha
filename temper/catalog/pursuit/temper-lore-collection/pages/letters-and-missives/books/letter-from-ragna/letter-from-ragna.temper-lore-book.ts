import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromRagna = {
  id: "01a0d5f3-0ef7-76b5-945b-8b41eda1290d",
  type: "page-type/temper-lore-book",
  slug: "letter-from-ragna",
  title: "Letter from Ragna",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 565,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
