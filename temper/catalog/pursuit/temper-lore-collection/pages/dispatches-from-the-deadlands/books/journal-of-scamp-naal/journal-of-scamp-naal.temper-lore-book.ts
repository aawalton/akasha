import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfScampNaal = {
  id: "01a0d60c-40c0-7e06-b658-51c646123f39",
  type: "page-type/temper-lore-book",
  slug: "journal-of-scamp-naal",
  title: "Journal of Scamp Naal",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 7004,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
