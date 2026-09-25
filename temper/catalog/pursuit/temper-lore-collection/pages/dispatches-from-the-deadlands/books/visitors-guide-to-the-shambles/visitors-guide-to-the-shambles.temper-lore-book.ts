import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const visitorsGuideToTheShambles = {
  id: "01a0d60c-40c1-7af7-8300-c2e4dfeddfbc",
  type: "page-type/temper-lore-book",
  slug: "visitors-guide-to-the-shambles",
  title: "Visitor's Guide to the Shambles",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6937,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
