import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const doomedExplorersJournal = {
  id: "01a0d5f6-a299-782d-b68b-a736e04edc3b",
  type: "page-type/temper-lore-book",
  slug: "doomed-explorers-journal",
  title: "Doomed Explorer's Journal",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5402,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
