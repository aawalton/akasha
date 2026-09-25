import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSummonersGuideToNymics = {
  id: "01a0d60d-156d-7a67-801c-2ae23fd01091",
  type: "page-type/temper-lore-book",
  slug: "a-summoners-guide-to-nymics",
  title: "A Summoner's Guide to Nymics",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7435,
  bookIndex: 65,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2275, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
