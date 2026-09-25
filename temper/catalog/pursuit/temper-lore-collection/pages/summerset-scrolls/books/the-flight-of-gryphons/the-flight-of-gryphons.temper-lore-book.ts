import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFlightOfGryphons = {
  id: "01a0d60a-d5bd-70b9-a377-482d4bad892e",
  type: "page-type/temper-lore-book",
  slug: "the-flight-of-gryphons",
  title: "The Flight of Gryphons",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5121,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
