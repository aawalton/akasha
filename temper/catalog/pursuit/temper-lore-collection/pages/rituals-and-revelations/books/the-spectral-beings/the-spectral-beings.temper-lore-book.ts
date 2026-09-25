import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSpectralBeings = {
  id: "01a0d5f5-444d-77ae-9d8b-32b16d73b825",
  type: "page-type/temper-lore-book",
  slug: "the-spectral-beings",
  title: "The Spectral Beings",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1170,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
