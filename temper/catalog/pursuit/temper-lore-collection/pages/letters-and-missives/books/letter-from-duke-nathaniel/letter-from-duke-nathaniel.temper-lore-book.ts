import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromDukeNathaniel = {
  id: "01a0d5f3-0ef7-7775-bcdb-701df28be8e8",
  type: "page-type/temper-lore-book",
  slug: "letter-from-duke-nathaniel",
  title: "Letter from Duke Nathaniel",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1244,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
