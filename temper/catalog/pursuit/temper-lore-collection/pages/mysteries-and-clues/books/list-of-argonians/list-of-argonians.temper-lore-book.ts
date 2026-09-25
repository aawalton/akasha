import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const listOfArgonians = {
  id: "01a0d5f4-07b8-7b39-acdb-df71df60df22",
  type: "page-type/temper-lore-book",
  slug: "list-of-argonians",
  title: "List of Argonians",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5173,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
