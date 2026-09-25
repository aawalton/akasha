import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const opheliasJournal = {
  id: "01a0d5f4-6f1b-750b-ae62-9490e14db636",
  type: "page-type/temper-lore-book",
  slug: "ophelias-journal",
  title: "Ophelia's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 410,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
