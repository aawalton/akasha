import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainKaleensLog = {
  id: "01a0d60c-75b4-7e1c-b4fa-5c33c07de209",
  type: "page-type/temper-lore-book",
  slug: "captain-kaleens-log",
  title: "Captain Kaleen's Log",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7266,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
