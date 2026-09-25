import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const imperialArchitectsCorrespondence = {
  id: "01a0d5f6-f385-7538-9ba4-b7ef08ee4e83",
  type: "page-type/temper-lore-book",
  slug: "imperial-architects-correspondence",
  title: "Imperial Architect's Correspondence",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 3144,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
