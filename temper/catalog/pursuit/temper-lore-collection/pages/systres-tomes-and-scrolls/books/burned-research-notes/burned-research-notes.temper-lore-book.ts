import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const burnedResearchNotes = {
  id: "01a0d60c-75b4-73cc-a3e1-04a2e8962736",
  type: "page-type/temper-lore-book",
  slug: "burned-research-notes",
  title: "Burned Research Notes",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7132,
  bookIndex: 33,
  charted: true,
  quest: 6765,
  positions: "jsonl",
} as const satisfies TemperLoreBook
