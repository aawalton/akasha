import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blasphemousRevenants = {
  id: "01a0d5f5-abb9-78ea-9c33-54a5f64ed83e",
  type: "page-type/temper-lore-book",
  slug: "blasphemous-revenants",
  title: "Blasphemous Revenants",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1608,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
