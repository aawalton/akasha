import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainZajisLog = {
  id: "01a0d60c-75b4-7a14-8655-ba9c6198f066",
  type: "page-type/temper-lore-book",
  slug: "captain-zajis-log",
  title: "Captain Za'ji's Log",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7267,
  bookIndex: 99,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
