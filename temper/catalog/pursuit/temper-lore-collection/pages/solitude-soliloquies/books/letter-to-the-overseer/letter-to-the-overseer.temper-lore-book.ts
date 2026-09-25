import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToTheOverseer = {
  id: "01a0d60b-8108-722e-9ccf-4f8f1404a97b",
  type: "page-type/temper-lore-book",
  slug: "letter-to-the-overseer",
  title: "Letter to the Overseer",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5853,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
