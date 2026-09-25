import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const siluransJournal = {
  id: "01a0d60d-ff6a-7af4-96ac-21f91e6d7040",
  type: "page-type/temper-lore-book",
  slug: "silurans-journal",
  title: "Siluran's Journal",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8394,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
