import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToCalahawn = {
  id: "01a0d5f3-0ef8-7b27-ab67-b576470624fb",
  type: "page-type/temper-lore-book",
  slug: "letter-to-calahawn",
  title: "Letter to Calahawn",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2133,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
