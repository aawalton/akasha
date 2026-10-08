import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theNomadsOfNirn = {
  id: "01a0d5f5-abbb-7dcc-9e4e-508db40b9dc0",
  type: "page-type/temper-lore-book",
  slug: "the-nomads-of-nirn",
  title: "The Nomads of Nirn",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 6272,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:27:22.427Z",
  updatedAt: "2026-09-25T00:27:24.000Z",
} as const satisfies TemperLoreBook
