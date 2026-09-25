import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const druidScapegoats = {
  id: "01a0d60c-baf3-7a1f-8b7f-b0ad505c7a65",
  type: "page-type/temper-lore-book",
  slug: "druid-scapegoats",
  title: "Druid Scapegoats",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7527,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
