import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gabriellesResearchNotes = {
  id: "01a0d60d-ff69-73f1-b12b-e92b39d53485",
  type: "page-type/temper-lore-book",
  slug: "gabrielles-research-notes",
  title: "Gabrielle's Research Notes",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8514,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
