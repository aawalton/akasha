import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMirrorPortalAGleanerLegend = {
  id: "01a0d60d-4ab0-73f3-a8e1-83d1a5004434",
  type: "page-type/temper-lore-book",
  slug: "the-mirror-portal-a-gleaner-legend",
  title: "The Mirror Portal: A Gleaner Legend",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7802,
  bookIndex: 15,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
