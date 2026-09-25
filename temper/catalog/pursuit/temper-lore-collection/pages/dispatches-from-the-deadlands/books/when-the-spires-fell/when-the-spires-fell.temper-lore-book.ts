import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whenTheSpiresFell = {
  id: "01a0d60c-40c1-72a3-9c6f-c7eddcd74011",
  type: "page-type/temper-lore-book",
  slug: "when-the-spires-fell",
  title: "When the Spires Fell",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6589,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
