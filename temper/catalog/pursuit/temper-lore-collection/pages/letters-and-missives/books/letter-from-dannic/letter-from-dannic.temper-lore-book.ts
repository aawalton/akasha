import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromDannic = {
  id: "01a0d5f3-0ef7-75db-a404-5b730e1da408",
  type: "page-type/temper-lore-book",
  slug: "letter-from-dannic",
  title: "Letter from Dannic",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1827,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
