import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToCaptainHelane = {
  id: "01a0d5f3-0ef8-7db0-914f-923ef4c4d890",
  type: "page-type/temper-lore-book",
  slug: "letter-to-captain-helane",
  title: "Letter to Captain Helane",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1056,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
