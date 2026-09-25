import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHolyWamasuCareAndFeeding = {
  id: "01a0d5f2-db27-7e2d-b9e1-9b368996f008",
  type: "page-type/temper-lore-book",
  slug: "the-holy-wamasu-care-and-feeding",
  title: "The Holy Wamasu: Care and Feeding",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 152,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
