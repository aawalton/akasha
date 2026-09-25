import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportOfCarisea = {
  id: "01a0d60d-ff6a-73b3-84ba-e6e83d4d723d",
  type: "page-type/temper-lore-book",
  slug: "report-of-carisea",
  title: "Report of Carisea",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8380,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
