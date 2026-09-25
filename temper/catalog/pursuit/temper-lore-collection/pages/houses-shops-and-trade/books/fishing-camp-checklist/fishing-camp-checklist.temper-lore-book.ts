import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fishingCampChecklist = {
  id: "01a0d5f2-db26-7997-ae5a-50aa40e8be9d",
  type: "page-type/temper-lore-book",
  slug: "fishing-camp-checklist",
  title: "Fishing Camp Checklist",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 374,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
