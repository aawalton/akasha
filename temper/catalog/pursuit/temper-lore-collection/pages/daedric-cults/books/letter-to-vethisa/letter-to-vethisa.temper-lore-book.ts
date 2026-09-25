import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToVethisa = {
  id: "01a0d5f2-253b-716f-9e47-cd5119b22cd1",
  type: "page-type/temper-lore-book",
  slug: "letter-to-vethisa",
  title: "Letter to Vethisa",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1931,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
