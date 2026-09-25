import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromBerfonas = {
  id: "01a0d5f3-0ef7-7b74-966c-0fb92d30f4f1",
  type: "page-type/temper-lore-book",
  slug: "letter-from-berfonas",
  title: "Letter from Berfonas",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 738,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
