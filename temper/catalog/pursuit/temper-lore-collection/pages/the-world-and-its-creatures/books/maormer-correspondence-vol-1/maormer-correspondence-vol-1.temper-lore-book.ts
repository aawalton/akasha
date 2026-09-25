import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const maormerCorrespondenceVol1 = {
  id: "01a0d5f5-f3e4-7587-91cd-2c7eba619b9e",
  type: "page-type/temper-lore-book",
  slug: "maormer-correspondence-vol-1",
  title: "Maormer Correspondence, Vol. 1",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1276,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
