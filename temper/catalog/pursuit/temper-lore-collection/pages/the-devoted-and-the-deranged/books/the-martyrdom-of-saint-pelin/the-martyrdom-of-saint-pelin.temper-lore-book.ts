import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMartyrdomOfSaintPelin = {
  id: "01a0d5f5-abbb-7d31-9f4c-58d5bb9339a4",
  type: "page-type/temper-lore-book",
  slug: "the-martyrdom-of-saint-pelin",
  title: "The Martyrdom of Saint Pelin",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1848,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
