import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ourDarkbinderAllies = {
  id: "01a0d60d-ff6a-7ebd-87d9-2998f4252613",
  type: "page-type/temper-lore-book",
  slug: "our-darkbinder-allies",
  title: "Our Darkbinder Allies",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8518,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
