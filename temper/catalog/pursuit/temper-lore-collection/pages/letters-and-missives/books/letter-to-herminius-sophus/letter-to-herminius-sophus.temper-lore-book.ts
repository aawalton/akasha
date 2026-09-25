import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToHerminiusSophus = {
  id: "01a0d5f3-0ef8-754c-a4ba-7b2e1a078cd0",
  type: "page-type/temper-lore-book",
  slug: "letter-to-herminius-sophus",
  title: "Letter to Herminius Sophus",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2035,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
