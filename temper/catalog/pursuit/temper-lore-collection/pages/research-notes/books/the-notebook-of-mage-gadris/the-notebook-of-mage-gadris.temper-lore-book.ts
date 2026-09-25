import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theNotebookOfMageGadris = {
  id: "01a0d5f5-1386-7587-a98c-5953e01f0675",
  type: "page-type/temper-lore-book",
  slug: "the-notebook-of-mage-gadris",
  title: "The Notebook of Mage Gadris",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1405,
  bookIndex: 56,
  charted: true,
  quest: 4623,
  positions: "jsonl",
} as const satisfies TemperLoreBook
