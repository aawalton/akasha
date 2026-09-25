import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromOleenla = {
  id: "01a0d5f3-0ef7-72fe-af92-612a15e1665b",
  type: "page-type/temper-lore-book",
  slug: "letter-from-oleenla",
  title: "Letter from Oleenla",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1350,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
