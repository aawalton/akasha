import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tobinMoorcroft = {
  id: "01a0d60c-75b6-7201-b112-663351e58480",
  type: "page-type/temper-lore-book",
  slug: "tobin-moorcroft",
  title: "Tobin Moorcroft",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7184,
  bookIndex: 27,
  charted: true,
  quest: 6796,
  positions: "jsonl",
} as const satisfies TemperLoreBook
