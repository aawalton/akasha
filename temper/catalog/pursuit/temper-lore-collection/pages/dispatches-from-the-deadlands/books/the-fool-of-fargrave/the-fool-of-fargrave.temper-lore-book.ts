import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFoolOfFargrave = {
  id: "01a0d60c-40c1-71c3-b1ea-688ec68cb214",
  type: "page-type/temper-lore-book",
  slug: "the-fool-of-fargrave",
  title: "The Fool of Fargrave",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6588,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
