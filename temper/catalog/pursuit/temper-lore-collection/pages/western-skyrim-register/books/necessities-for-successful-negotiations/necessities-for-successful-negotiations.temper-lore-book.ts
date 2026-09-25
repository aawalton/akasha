import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const necessitiesForSuccessfulNegotiations = {
  id: "01a0d60b-a361-7dd7-a6a9-95620fe7e5cc",
  type: "page-type/temper-lore-book",
  slug: "necessities-for-successful-negotiations",
  title: "Necessities for Successful Negotiations",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6242,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
