import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToJazish = {
  id: "01a0d5f2-af70-7ad3-8cd6-06d77116462a",
  type: "page-type/temper-lore-book",
  slug: "letter-to-jazish",
  title: "Letter to Jazish",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 642,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
