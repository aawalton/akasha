import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const archwizardTwelvanesDecree = {
  id: "01a0d60c-eb9a-700e-9146-389d1c5b5e53",
  type: "page-type/temper-lore-book",
  slug: "archwizard-twelvanes-decree",
  title: "Archwizard Twelvane's Decree",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7592,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
