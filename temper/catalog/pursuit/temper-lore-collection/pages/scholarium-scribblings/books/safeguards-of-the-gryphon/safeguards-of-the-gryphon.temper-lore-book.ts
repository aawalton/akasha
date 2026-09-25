import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const safeguardsOfTheGryphon = {
  id: "01a0d60d-9a64-7e2f-8111-03c204a8c117",
  type: "page-type/temper-lore-book",
  slug: "safeguards-of-the-gryphon",
  title: "Safeguards of the Gryphon",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8086,
  bookIndex: 62,
  charted: true,
  quest: 7217,
  positions: "jsonl",
} as const satisfies TemperLoreBook
