import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const greenPactSong = {
  id: "01a0d60d-4aaf-7c53-8af3-4d4f2957dd28",
  type: "page-type/temper-lore-book",
  slug: "green-pact-song",
  title: "Green Pact Song",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8110,
  bookIndex: 32,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
