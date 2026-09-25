import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const moonSugarPlans = {
  id: "01a0d60b-4e03-7f6f-832a-4197da1c6956",
  type: "page-type/temper-lore-book",
  slug: "moon-sugar-plans",
  title: "Moon-Sugar Plans",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5706,
  bookIndex: 2,
  charted: true,
  quest: 6413,
  positions: "jsonl",
} as const satisfies TemperLoreBook
