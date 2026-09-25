import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stillWatersJournal = {
  id: "01a0d5f4-6f1b-7bdb-be14-6aeabb39620c",
  type: "page-type/temper-lore-book",
  slug: "still-waters-journal",
  title: "Still-Water's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2329,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
