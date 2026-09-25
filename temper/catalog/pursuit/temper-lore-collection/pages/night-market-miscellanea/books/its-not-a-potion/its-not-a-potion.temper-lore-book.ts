import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const itsNotAPotion = {
  id: "01a0d60e-687f-7de9-89d2-e6ba2e380e86",
  type: "page-type/temper-lore-book",
  slug: "its-not-a-potion",
  title: "IT'S NOT A POTION!",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8676,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
