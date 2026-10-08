import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const taleOfTwoMoons = {
  id: "01a0d5f6-1c16-7164-8c11-43f8d7130a44",
  type: "page-type/temper-lore-book",
  slug: "tale-of-two-moons",
  title: "Tale of Two Moons",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1511,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:27:51.190Z",
  updatedAt: "2026-09-25T00:27:53.000Z",
} as const satisfies TemperLoreBook
