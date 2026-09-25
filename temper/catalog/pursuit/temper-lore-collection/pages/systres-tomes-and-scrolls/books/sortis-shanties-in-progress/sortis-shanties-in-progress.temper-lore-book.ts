import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sortisShantiesInProgress = {
  id: "01a0d60c-75b6-761e-a3ad-eddf5caf2b85",
  type: "page-type/temper-lore-book",
  slug: "sortis-shanties-in-progress",
  title: "Sorti's Shanties in Progress",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7040,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
