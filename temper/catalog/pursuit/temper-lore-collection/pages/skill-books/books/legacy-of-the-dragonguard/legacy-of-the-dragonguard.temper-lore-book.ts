import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legacyOfTheDragonguard = {
  id: "01a0d5f6-6d41-7824-aba3-c2d2f85e1259",
  type: "page-type/temper-lore-book",
  slug: "legacy-of-the-dragonguard",
  title: "Legacy of the Dragonguard",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2398,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
