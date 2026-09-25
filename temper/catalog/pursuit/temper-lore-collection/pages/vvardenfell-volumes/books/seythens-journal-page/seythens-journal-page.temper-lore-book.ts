import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seythensJournalPage = {
  id: "01a0d5f7-aa99-752a-a896-304de96245b5",
  type: "page-type/temper-lore-book",
  slug: "seythens-journal-page",
  title: "Seythen's Journal Page",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4044,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
