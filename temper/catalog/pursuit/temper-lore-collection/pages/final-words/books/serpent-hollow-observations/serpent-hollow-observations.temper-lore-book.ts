import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const serpentHollowObservations = {
  id: "01a0d5f6-45ae-7934-aff0-278ed4d9a9ef",
  type: "page-type/temper-lore-book",
  slug: "serpent-hollow-observations",
  title: "Serpent Hollow Observations",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1932,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
