import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const calosJournal = {
  id: "01a0d5f4-6f1a-7aa6-a390-2c65e466602a",
  type: "page-type/temper-lore-book",
  slug: "calos-journal",
  title: "Calo's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 390,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
