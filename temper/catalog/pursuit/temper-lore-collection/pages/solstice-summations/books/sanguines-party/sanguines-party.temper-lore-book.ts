import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sanguinesParty = {
  id: "01a0d60d-ff6a-7403-98fd-d208269fdb0a",
  type: "page-type/temper-lore-book",
  slug: "sanguines-party",
  title: "Sanguine's Party",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8224,
  bookIndex: 44,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2603, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
