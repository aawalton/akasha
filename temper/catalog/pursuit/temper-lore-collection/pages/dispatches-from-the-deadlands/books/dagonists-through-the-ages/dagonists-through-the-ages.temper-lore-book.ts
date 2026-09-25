import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dagonistsThroughTheAges = {
  id: "01a0d60c-40bf-78cf-91e2-f1ced7cbce25",
  type: "page-type/temper-lore-book",
  slug: "dagonists-through-the-ages",
  title: "Dagonists Through the Ages",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6742,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
