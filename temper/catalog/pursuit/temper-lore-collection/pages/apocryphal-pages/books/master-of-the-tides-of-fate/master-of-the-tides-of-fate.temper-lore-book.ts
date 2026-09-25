import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const masterOfTheTidesOfFate = {
  id: "01a0d60d-156e-7e69-b4a7-c654973222fa",
  type: "page-type/temper-lore-book",
  slug: "master-of-the-tides-of-fate",
  title: "Master of the Tides of Fate",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7438,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
