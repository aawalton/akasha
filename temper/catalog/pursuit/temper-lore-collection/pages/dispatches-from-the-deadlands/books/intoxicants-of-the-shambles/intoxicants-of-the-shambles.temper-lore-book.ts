import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const intoxicantsOfTheShambles = {
  id: "01a0d60c-40c0-74a4-b1cb-dca62c8cb96f",
  type: "page-type/temper-lore-book",
  slug: "intoxicants-of-the-shambles",
  title: "Intoxicants of the Shambles",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6741,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
