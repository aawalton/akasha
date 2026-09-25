import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const grigerdasLetter = {
  id: "01a0d5f3-0ef7-7a47-8cfc-9ed937936901",
  type: "page-type/temper-lore-book",
  slug: "grigerdas-letter",
  title: "Grigerda's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2262,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
