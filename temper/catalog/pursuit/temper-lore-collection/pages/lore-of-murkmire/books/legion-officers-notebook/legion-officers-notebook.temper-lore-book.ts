import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legionOfficersNotebook = {
  id: "01a0d5f6-a299-773a-8a8a-aa58b15b2ff9",
  type: "page-type/temper-lore-book",
  slug: "legion-officers-notebook",
  title: "Legion Officer's Notebook",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5148,
  bookIndex: 46,
  charted: true,
  quest: 6240,
  positions: "jsonl",
} as const satisfies TemperLoreBook
