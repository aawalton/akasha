import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const workForHireInMarkarth = {
  id: "01a0d60b-c959-7cef-b102-b6d7c6a04e9c",
  type: "page-type/temper-lore-book",
  slug: "work-for-hire-in-markarth",
  title: "Work for Hire in Markarth",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6245,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
