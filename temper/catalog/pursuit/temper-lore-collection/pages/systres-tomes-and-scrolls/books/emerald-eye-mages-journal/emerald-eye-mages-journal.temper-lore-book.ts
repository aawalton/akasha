import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const emeraldEyeMagesJournal = {
  id: "01a0d60c-75b5-74a5-827a-80de836ad86c",
  type: "page-type/temper-lore-book",
  slug: "emerald-eye-mages-journal",
  title: "Emerald Eye Mage's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7098,
  charted: true,
  quest: 6787,
  positions: "jsonl",
} as const satisfies TemperLoreBook
