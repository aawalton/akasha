import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hinaamosJournal = {
  id: "01a0d5f4-c388-739f-8555-d962f57befa1",
  type: "page-type/temper-lore-book",
  slug: "hinaamos-journal",
  title: "Hinaamo's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1607,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
