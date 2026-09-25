import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportOnTheDespotOfMarkarth = {
  id: "01a0d60b-c958-7ad5-b9a8-3c7e28acd415",
  type: "page-type/temper-lore-book",
  slug: "report-on-the-despot-of-markarth",
  title: "Report on the Despot of Markarth",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6013,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
