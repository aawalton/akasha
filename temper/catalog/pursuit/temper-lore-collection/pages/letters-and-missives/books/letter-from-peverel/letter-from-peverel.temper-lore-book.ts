import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromPeverel = {
  id: "01a0d5f3-0ef7-7a3b-8812-7dbc920607fd",
  type: "page-type/temper-lore-book",
  slug: "letter-from-peverel",
  title: "Letter from Peverel",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1343,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
