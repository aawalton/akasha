import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dreamsOfTheForgotten = {
  id: "01a0d60d-156d-7649-b67d-556c2e87dc97",
  type: "page-type/temper-lore-book",
  slug: "dreams-of-the-forgotten",
  title: "Dreams of the Forgotten",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7653,
  bookIndex: 10,
  charted: true,
  quest: 6974,
  positions: "jsonl",
} as const satisfies TemperLoreBook
