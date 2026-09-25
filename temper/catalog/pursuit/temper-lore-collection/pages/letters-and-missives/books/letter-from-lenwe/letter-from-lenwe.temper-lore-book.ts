import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromLenwe = {
  id: "01a0d5f3-0ef7-7824-bb48-29360f66c0e4",
  type: "page-type/temper-lore-book",
  slug: "letter-from-lenwe",
  title: "Letter from Lenwe",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 660,
  bookIndex: 18,
  charted: true,
  quest: 4266,
  positions: "jsonl",
} as const satisfies TemperLoreBook
