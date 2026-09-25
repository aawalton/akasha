import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aPerfectDrink = {
  id: "01a0d60b-fdaf-7487-9bc7-d82364a8c00a",
  type: "page-type/temper-lore-book",
  slug: "a-perfect-drink",
  title: "A Perfect Drink",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6619,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
