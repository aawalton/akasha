import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warningCatacombsInfested = {
  id: "01a0d5f2-83a4-724e-b759-a4db517ca6b0",
  type: "page-type/temper-lore-book",
  slug: "warning-catacombs-infested",
  title: "Warning: Catacombs Infested!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 90,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
