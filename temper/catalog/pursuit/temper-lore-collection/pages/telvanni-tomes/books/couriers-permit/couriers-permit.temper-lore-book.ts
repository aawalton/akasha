import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const couriersPermit = {
  id: "01a0d60c-eb9b-714f-85f4-bf8b9fb0dc9c",
  type: "page-type/temper-lore-book",
  slug: "couriers-permit",
  title: "Courier's Permit",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7578,
  bookIndex: 74,
  charted: true,
  quest: 7018,
  positions: "jsonl",
} as const satisfies TemperLoreBook
