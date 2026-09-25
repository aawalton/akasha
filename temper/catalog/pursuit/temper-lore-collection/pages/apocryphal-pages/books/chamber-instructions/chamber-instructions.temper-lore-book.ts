import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chamberInstructions = {
  id: "01a0d60d-156d-7010-9d2b-e34c438de3d7",
  type: "page-type/temper-lore-book",
  slug: "chamber-instructions",
  title: "Chamber Instructions",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7651,
  bookIndex: 9,
  charted: true,
  quest: 6974,
  positions: "jsonl",
} as const satisfies TemperLoreBook
