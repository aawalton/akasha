import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const somethingsInTheAttic = {
  id: "01a0d5f5-abba-729b-99e4-dbce77bc1832",
  type: "page-type/temper-lore-book",
  slug: "somethings-in-the-attic",
  title: "Something's in the Attic",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2097,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
