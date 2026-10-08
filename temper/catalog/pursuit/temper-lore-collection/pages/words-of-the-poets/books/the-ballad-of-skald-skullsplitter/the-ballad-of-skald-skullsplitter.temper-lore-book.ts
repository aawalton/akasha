import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBalladOfSkaldSkullsplitter = {
  id: "01a0d5f6-1c16-77d9-8aac-485938a7391b",
  type: "page-type/temper-lore-book",
  slug: "the-ballad-of-skald-skullsplitter",
  title: "The Ballad of Skald Skullsplitter",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 553,
  bookIndex: 13,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 25, mapCount: 1 }],
  positions: "jsonl",
  createdAt: "2026-09-25T00:27:51.190Z",
  updatedAt: "2026-09-25T00:27:53.000Z",
} as const satisfies TemperLoreBook
