import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToSentulus = {
  id: "01a0d5f2-253b-72fa-bcca-d44d7cc146e5",
  type: "page-type/temper-lore-book",
  slug: "letter-to-sentulus",
  title: "Letter to Sentulus",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1275,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
