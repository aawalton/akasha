import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const faunsThicketResearchNotes = {
  id: "01a0d60c-baf3-76f6-84da-1c9b5b4ea17c",
  type: "page-type/temper-lore-book",
  slug: "fauns-thicket-research-notes",
  title: "Fauns' Thicket Research Notes",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7467,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
