import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tombsOfTheKinrulers = {
  id: "01a0d60d-ff6a-7045-a014-0d00aad0ebb9",
  type: "page-type/temper-lore-book",
  slug: "tombs-of-the-kinrulers",
  title: "Tombs of the Kinrulers",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8522,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
