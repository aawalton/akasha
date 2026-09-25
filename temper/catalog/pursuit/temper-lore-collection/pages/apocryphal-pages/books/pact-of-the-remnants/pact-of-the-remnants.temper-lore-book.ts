import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pactOfTheRemnants = {
  id: "01a0d60d-156e-72c9-a9df-16bb2ab05de3",
  type: "page-type/temper-lore-book",
  slug: "pact-of-the-remnants",
  title: "Pact of the Remnants",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7610,
  bookIndex: 29,
  charted: true,
  quest: 6992,
  positions: "jsonl",
} as const satisfies TemperLoreBook
