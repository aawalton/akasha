import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const artisansNotes = {
  id: "01a0d5f6-d68a-7ccb-83ef-f0009444c27d",
  type: "page-type/temper-lore-book",
  slug: "artisans-notes",
  title: "Artisan's Notes",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3165,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
