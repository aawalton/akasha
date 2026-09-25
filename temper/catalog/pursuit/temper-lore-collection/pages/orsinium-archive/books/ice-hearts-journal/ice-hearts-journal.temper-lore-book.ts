import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const iceHeartsJournal = {
  id: "01a0d5f7-160b-759b-978c-d5c185f04cdb",
  type: "page-type/temper-lore-book",
  slug: "ice-hearts-journal",
  title: "Ice-Heart's Journal",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3211,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
