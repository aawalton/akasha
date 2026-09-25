import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thorzhulsLetter = {
  id: "01a0d5f3-0ef9-74d2-a2ba-b3589bad12e3",
  type: "page-type/temper-lore-book",
  slug: "thorzhuls-letter",
  title: "Thorzhul's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1828,
  bookIndex: 72,
  charted: true,
  quest: 4852,
  positions: "jsonl",
} as const satisfies TemperLoreBook
