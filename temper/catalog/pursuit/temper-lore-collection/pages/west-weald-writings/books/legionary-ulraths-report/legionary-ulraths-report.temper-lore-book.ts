import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legionaryUlrathsReport = {
  id: "01a0d60d-4aaf-75d5-877f-fe04d8aa767b",
  type: "page-type/temper-lore-book",
  slug: "legionary-ulraths-report",
  title: "Legionary Ulrath's Report",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8074,
  bookIndex: 62,
  charted: true,
  quest: 7214,
  positions: "jsonl",
} as const satisfies TemperLoreBook
