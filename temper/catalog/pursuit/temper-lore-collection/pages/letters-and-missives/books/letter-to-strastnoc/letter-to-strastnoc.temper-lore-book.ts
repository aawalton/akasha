import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToStrastnoc = {
  id: "01a0d5f3-0ef8-70bf-a20d-d8336360b2bb",
  type: "page-type/temper-lore-book",
  slug: "letter-to-strastnoc",
  title: "Letter to Strastnoc",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2532,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
