import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromQuintus = {
  id: "01a0d5f3-0ef7-7656-84fd-b6afbb0363ad",
  type: "page-type/temper-lore-book",
  slug: "letter-from-quintus",
  title: "Letter from Quintus",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1398,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
