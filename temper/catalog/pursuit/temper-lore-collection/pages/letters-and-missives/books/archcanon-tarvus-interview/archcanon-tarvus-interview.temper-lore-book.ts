import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const archcanonTarvusInterview = {
  id: "01a0d5f3-0ef7-778f-a3eb-1ee8edf2714b",
  type: "page-type/temper-lore-book",
  slug: "archcanon-tarvus-interview",
  title: "Archcanon Tarvus Interview",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 4560,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
