import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gavrossResearchNotes = {
  id: "01a0d5f7-aa98-7c5b-a49f-fb611bb55796",
  type: "page-type/temper-lore-book",
  slug: "gavross-research-notes",
  title: "Gavros's Research Notes",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4032,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
