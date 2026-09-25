import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thulgegsMarch = {
  id: "01a0d60d-9a64-7283-a2e0-d1d4fd1a3bc5",
  type: "page-type/temper-lore-book",
  slug: "thulgegs-march",
  title: "Thulgeg's March",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8184,
  bookIndex: 16,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
} as const satisfies TemperLoreBook
