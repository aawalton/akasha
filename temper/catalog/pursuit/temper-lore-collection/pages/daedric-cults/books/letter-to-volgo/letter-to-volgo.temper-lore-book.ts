import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToVolgo = {
  id: "01a0d5f2-253b-70dd-a751-2f47c0791c40",
  type: "page-type/temper-lore-book",
  slug: "letter-to-volgo",
  title: "Letter to Volgo",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1930,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
