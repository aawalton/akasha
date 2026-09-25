import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const libationToSanguine = {
  id: "01a0d60d-ff6a-778e-bd1f-b2457c8a53de",
  type: "page-type/temper-lore-book",
  slug: "libation-to-sanguine",
  title: "Libation to Sanguine",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8238,
  bookIndex: 51,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2603, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
