import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const leonaudNiscelsJournal = {
  id: "01a0d60d-4aaf-77fb-93cb-ff2d5f26f71f",
  type: "page-type/temper-lore-book",
  slug: "leonaud-niscels-journal",
  title: "Leonaud Niscel's Journal",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8140,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
