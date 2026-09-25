import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ritesOfTheOrderOfTheHiddenMoon = {
  id: "01a0d60d-bbe4-755a-b51e-6799ba18531c",
  type: "page-type/temper-lore-book",
  slug: "rites-of-the-order-of-the-hidden-moon",
  title: "Rites of the Order of the Hidden Moon",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 7959,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
