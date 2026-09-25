import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pilferedPoison = {
  id: "01a0d60b-a362-7f2e-a7b2-ffc65aee5c1b",
  type: "page-type/temper-lore-book",
  slug: "pilfered-poison",
  title: "Pilfered Poison",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6084,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
