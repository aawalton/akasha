import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const floraAndFaunaOfTheSever = {
  id: "01a0d60c-40c0-71a9-a22a-6c98462a8982",
  type: "page-type/temper-lore-book",
  slug: "flora-and-fauna-of-the-sever",
  title: "Flora and Fauna of the Sever",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 7049,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
