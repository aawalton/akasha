import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nineCommandsOfTheEightDivines = {
  id: "01a0d5e3-944e-765f-a4e4-e7d74df6fc79",
  type: "page-type/temper-lore-book",
  slug: "nine-commands-of-the-eight-divines",
  title: "Nine Commands of the Eight Divines",
  collection: "temper-lore-collection/divines-and-deities",
  bookIndex: 8,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
