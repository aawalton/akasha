import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rigurtsJournal = {
  id: "01a0d5f4-6f1b-7616-bedc-d3d161ba72ab",
  type: "page-type/temper-lore-book",
  slug: "rigurts-journal",
  title: "Rigurt's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 619,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
