import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCurrencyOfSecrets = {
  id: "01a0d60d-156e-7fac-a830-dee851b71175",
  type: "page-type/temper-lore-book",
  slug: "the-currency-of-secrets",
  title: "The Currency of Secrets",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7428,
  bookIndex: 15,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2275, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
