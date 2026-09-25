import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whiteRoseGuardsJournal = {
  id: "01a0d5f4-6f1b-7ca4-afc5-9988a9ccebb8",
  type: "page-type/temper-lore-book",
  slug: "white-rose-guards-journal",
  title: "White Rose Guard's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1599,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
