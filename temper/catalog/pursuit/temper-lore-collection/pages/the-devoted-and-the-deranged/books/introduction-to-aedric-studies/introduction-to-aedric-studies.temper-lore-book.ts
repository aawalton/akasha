import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const introductionToAedricStudies = {
  id: "01a0d5f5-abba-7a74-bc44-d1a8e99c018c",
  type: "page-type/temper-lore-book",
  slug: "introduction-to-aedric-studies",
  title: "Introduction to Aedric Studies",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 2949,
  bookIndex: 76,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 26, mapCount: 1 },
    { mapId: 660, mapCount: 6 },
  ],
  positions: "jsonl",
} as const satisfies TemperLoreBook
