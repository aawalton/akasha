import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const songOfAlkoshsChampion = {
  id: "01a0d60b-4e03-762a-b20a-b3f94df83d64",
  type: "page-type/temper-lore-book",
  slug: "song-of-alkoshs-champion",
  title: "Song of Alkosh's Champion",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5674,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
