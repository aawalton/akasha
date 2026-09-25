import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFootstepsOfShezarr = {
  id: "01a0d60d-4ab0-7159-8106-6a499332d40e",
  type: "page-type/temper-lore-book",
  slug: "the-footsteps-of-shezarr",
  title: "The Footsteps of Shezarr",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7807,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
