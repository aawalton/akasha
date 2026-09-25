import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pactRecruitment = {
  id: "01a0d5f3-7053-75aa-8a88-fd6a298ab69c",
  type: "page-type/temper-lore-book",
  slug: "pact-recruitment",
  title: "Pact Recruitment",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2319,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
