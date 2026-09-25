import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLostCommunion = {
  id: "01a0d5f5-abbb-7182-9b68-97c73ce03c6b",
  type: "page-type/temper-lore-book",
  slug: "the-lost-communion",
  title: "The Lost Communion",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 70,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
