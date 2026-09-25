import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromSisterGlynolde = {
  id: "01a0d60b-c958-7a70-bb07-48b0711b3185",
  type: "page-type/temper-lore-book",
  slug: "letter-from-sister-glynolde",
  title: "Letter from Sister Glynolde",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6310,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
