import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const listensToWatersObservations = {
  id: "01a0d5f2-509f-767d-b5d1-91cda553267c",
  type: "page-type/temper-lore-book",
  slug: "listens-to-waters-observations",
  title: "Listens-to-Water's Observations",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 966,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
