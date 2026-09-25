import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const introductionToStagecraft = {
  id: "01a0d5f3-3fda-7e8d-ba43-32b488016cd6",
  type: "page-type/temper-lore-book",
  slug: "introduction-to-stagecraft",
  title: "Introduction to Stagecraft",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2120,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
