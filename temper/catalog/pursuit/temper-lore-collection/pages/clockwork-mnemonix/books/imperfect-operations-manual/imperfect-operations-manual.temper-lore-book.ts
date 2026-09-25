import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const imperfectOperationsManual = {
  id: "01a0d60a-a213-7612-a8af-5dca87e380d3",
  type: "page-type/temper-lore-book",
  slug: "imperfect-operations-manual",
  title: "Imperfect Operations Manual",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4585,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
