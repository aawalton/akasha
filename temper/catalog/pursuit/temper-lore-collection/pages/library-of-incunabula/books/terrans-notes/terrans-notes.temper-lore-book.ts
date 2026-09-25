import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const terransNotes = {
  id: "01a0d5f8-02f9-7b8b-b3fa-2469aa66c494",
  type: "page-type/temper-lore-book",
  slug: "terrans-notes",
  title: "Terran's Notes",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 3047,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
