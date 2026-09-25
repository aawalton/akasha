import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onThePactPrimordial = {
  id: "01a0d60d-156e-7d09-833f-4d939eaf2319",
  type: "page-type/temper-lore-book",
  slug: "on-the-pact-primordial",
  title: "On the Pact Primordial",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7654,
  bookIndex: 11,
  charted: true,
  quest: 6974,
  positions: "jsonl",
} as const satisfies TemperLoreBook
