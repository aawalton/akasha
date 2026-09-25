import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromSealordNalos = {
  id: "01a0d60c-baf3-7d04-849a-f3df187bb111",
  type: "page-type/temper-lore-book",
  slug: "orders-from-sealord-nalos",
  title: "Orders from Sealord Nalos",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7306,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
