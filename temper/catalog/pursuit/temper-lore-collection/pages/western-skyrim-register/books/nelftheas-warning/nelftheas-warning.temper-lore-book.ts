import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nelftheasWarning = {
  id: "01a0d60b-a362-75a7-8dc5-4bbfe1414c98",
  type: "page-type/temper-lore-book",
  slug: "nelftheas-warning",
  title: "Nelfthea's Warning",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 5938,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
