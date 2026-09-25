import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gangsOfTheShambles = {
  id: "01a0d60c-40c0-76c8-8193-00d793ee9bd8",
  type: "page-type/temper-lore-book",
  slug: "gangs-of-the-shambles",
  title: "Gangs of the Shambles",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6942,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
