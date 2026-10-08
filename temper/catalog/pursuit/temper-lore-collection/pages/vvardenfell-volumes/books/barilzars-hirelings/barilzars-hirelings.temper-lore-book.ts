import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const barilzarsHirelings = {
  id: "01a0d5f7-aa98-702d-9713-e960b326bc9c",
  type: "page-type/temper-lore-book",
  slug: "barilzars-hirelings",
  title: "Barilzar's Hirelings",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4061,
  bookIndex: 91,
  charted: true,
  quest: 5893,
  positions: "jsonl",
  createdAt: "2026-09-25T00:29:33.208Z",
  updatedAt: "2026-09-25T00:29:35.000Z",
} as const satisfies TemperLoreBook
