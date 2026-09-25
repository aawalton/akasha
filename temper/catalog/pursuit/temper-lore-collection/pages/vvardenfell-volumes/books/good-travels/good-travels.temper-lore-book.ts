import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goodTravels = {
  id: "01a0d5f7-aa98-7bda-8148-92da88c69283",
  type: "page-type/temper-lore-book",
  slug: "good-travels",
  title: "Good Travels!",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4103,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
