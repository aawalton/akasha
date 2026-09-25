import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const incompleteLetter = {
  id: "01a0d5f3-0ef7-775c-8d2f-e6f0d1ba8cb6",
  type: "page-type/temper-lore-book",
  slug: "incomplete-letter",
  title: "Incomplete Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 302,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
