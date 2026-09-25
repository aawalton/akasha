import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const transportPlans = {
  id: "01a0d60c-75b6-76af-95a3-efc02fb6a207",
  type: "page-type/temper-lore-book",
  slug: "transport-plans",
  title: "Transport Plans",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7017,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
