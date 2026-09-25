import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToOfglog = {
  id: "01a0d5f3-0ef8-7d3d-ad55-8822eead91d4",
  type: "page-type/temper-lore-book",
  slug: "letter-to-ofglog",
  title: "Letter to Ofglog",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2549,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
