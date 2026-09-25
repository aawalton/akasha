import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const centurionsSignet = {
  id: "01a0d5f6-d68a-7ffb-8427-8158b53208ac",
  type: "page-type/temper-lore-book",
  slug: "centurions-signet",
  title: "Centurion's Signet",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3122,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
