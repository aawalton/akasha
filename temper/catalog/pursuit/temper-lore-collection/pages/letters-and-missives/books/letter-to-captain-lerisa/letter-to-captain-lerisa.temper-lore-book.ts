import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToCaptainLerisa = {
  id: "01a0d5f3-0ef8-775c-8c49-4b0fd750b7a3",
  type: "page-type/temper-lore-book",
  slug: "letter-to-captain-lerisa",
  title: "Letter to Captain Lerisa",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1305,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
