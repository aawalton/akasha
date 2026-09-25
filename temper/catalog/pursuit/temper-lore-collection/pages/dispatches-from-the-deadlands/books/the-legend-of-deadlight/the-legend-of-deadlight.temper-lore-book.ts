import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLegendOfDeadlight = {
  id: "01a0d60c-40c1-7663-aaea-30737c0f5441",
  type: "page-type/temper-lore-book",
  slug: "the-legend-of-deadlight",
  title: "The Legend of Deadlight",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6926,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
