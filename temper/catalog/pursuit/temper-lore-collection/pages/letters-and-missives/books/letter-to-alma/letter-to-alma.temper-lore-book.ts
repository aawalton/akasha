import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToAlma = {
  id: "01a0d5f3-0ef8-7222-b786-84930cf764e2",
  type: "page-type/temper-lore-book",
  slug: "letter-to-alma",
  title: "Letter to Alma",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2219,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
