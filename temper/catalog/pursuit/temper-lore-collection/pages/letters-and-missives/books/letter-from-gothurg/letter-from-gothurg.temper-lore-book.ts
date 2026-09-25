import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromGothurg = {
  id: "01a0d5f3-0ef7-7f1e-9ed4-34ae9f9f329f",
  type: "page-type/temper-lore-book",
  slug: "letter-from-gothurg",
  title: "Letter from Gothurg",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 94,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
