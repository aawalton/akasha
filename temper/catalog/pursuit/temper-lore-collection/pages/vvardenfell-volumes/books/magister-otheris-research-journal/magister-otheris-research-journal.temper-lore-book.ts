import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const magisterOtherisResearchJournal = {
  id: "01a0d5f7-aa99-75e7-a367-626f7d6f0983",
  type: "page-type/temper-lore-book",
  slug: "magister-otheris-research-journal",
  title: "Magister Otheri's Research Journal",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4052,
  charted: true,
  quest: 5914,
  positions: "jsonl",
} as const satisfies TemperLoreBook
