import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theButcherOfBravil = {
  id: "01a0d5f7-73fb-71cc-bb71-989416222d38",
  type: "page-type/temper-lore-book",
  slug: "the-butcher-of-bravil",
  title: "The Butcher of Bravil",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3531,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
