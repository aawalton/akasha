import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aerasLetterToTryn = {
  id: "01a0d5f3-0ef7-7616-ac62-d6538129e6a1",
  type: "page-type/temper-lore-book",
  slug: "aeras-letter-to-tryn",
  title: "Aera's Letter to Tryn",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1046,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
