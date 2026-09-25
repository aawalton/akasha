import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLamiaThreat = {
  id: "01a0d5f3-7054-7f03-96a8-489e6a89c946",
  type: "page-type/temper-lore-book",
  slug: "the-lamia-threat",
  title: "The Lamia Threat",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 842,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
