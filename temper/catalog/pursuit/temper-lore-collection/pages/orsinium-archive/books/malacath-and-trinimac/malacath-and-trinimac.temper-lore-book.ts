import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const malacathAndTrinimac = {
  id: "01a0d5f7-160b-767e-826f-5e129a402741",
  type: "page-type/temper-lore-book",
  slug: "malacath-and-trinimac",
  title: "Malacath and Trinimac",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3225,
  bookIndex: 13,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 27, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
