import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const visitorsGuideToFargrave = {
  id: "01a0d60c-40c1-7fde-9de7-94269ec95f8e",
  type: "page-type/temper-lore-book",
  slug: "visitors-guide-to-fargrave",
  title: "Visitor's Guide to Fargrave",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6838,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
