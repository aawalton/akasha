import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const messengersReport = {
  id: "01a0d60c-baf3-7837-950a-b02a5716b874",
  type: "page-type/temper-lore-book",
  slug: "messengers-report",
  title: "Messenger's Report",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7305,
  bookIndex: 2,
  charted: true,
  quest: 6847,
  positions: "jsonl",
} as const satisfies TemperLoreBook
