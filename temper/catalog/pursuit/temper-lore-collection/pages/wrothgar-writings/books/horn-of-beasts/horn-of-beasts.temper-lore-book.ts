import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hornOfBeasts = {
  id: "01a0d5f6-d68a-7cbd-8f04-8a17d2519b2a",
  type: "page-type/temper-lore-book",
  slug: "horn-of-beasts",
  title: "Horn of Beasts",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3120,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:38.922Z",
  updatedAt: "2026-09-25T00:28:41.000Z",
} as const satisfies TemperLoreBook
