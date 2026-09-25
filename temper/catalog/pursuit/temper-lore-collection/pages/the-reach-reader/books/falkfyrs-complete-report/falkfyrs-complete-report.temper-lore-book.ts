import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const falkfyrsCompleteReport = {
  id: "01a0d60b-c957-792e-80dd-b498b4e728ff",
  type: "page-type/temper-lore-book",
  slug: "falkfyrs-complete-report",
  title: "Falkfyr's Complete Report",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6323,
  bookIndex: 51,
  charted: true,
  quest: 6591,
  positions: "jsonl",
} as const satisfies TemperLoreBook
