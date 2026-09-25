import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lanternOfLies = {
  id: "01a0d60a-f1ec-7ee8-bb98-db31bea62bed",
  type: "page-type/temper-lore-book",
  slug: "lantern-of-lies",
  title: "Lantern of Lies",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4815,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
