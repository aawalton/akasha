import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wamasuObservations = {
  id: "01a0d5f1-c91b-7a22-a782-0a453db8f31f",
  type: "page-type/temper-lore-book",
  slug: "wamasu-observations",
  title: "Wamasu Observations",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2692,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
