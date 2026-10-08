import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bitterTravelsAmongTheNixad = {
  id: "01a0d5f7-73f9-70cf-acaf-eca6535305b9",
  type: "page-type/temper-lore-book",
  slug: "bitter-travels-among-the-nixad",
  title: "Bitter Travels Among the Nixad",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3700,
  bookIndex: 80,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 29, mapCount: 1 }],
  positions: "jsonl",
  createdAt: "2026-09-25T00:29:19.225Z",
  updatedAt: "2026-09-25T00:29:21.000Z",
} as const satisfies TemperLoreBook
