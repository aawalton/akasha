import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const borzughsLetter = {
  id: "01a0d5f3-0ef7-779b-8de6-aabd27bdaf1c",
  type: "page-type/temper-lore-book",
  slug: "borzughs-letter",
  title: "Borzugh's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1829,
  bookIndex: 73,
  charted: true,
  quest: 4852,
  positions: "jsonl",
} as const satisfies TemperLoreBook
