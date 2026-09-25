import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kirethsPrismNotes = {
  id: "01a0d5f5-1385-7d49-89bf-75988a69de0f",
  type: "page-type/temper-lore-book",
  slug: "kireths-prism-notes",
  title: "Kireth's Prism Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1054,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
