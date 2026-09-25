import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lastOfTheAyleidKings = {
  id: "01a0d60d-4aaf-7556-b6b3-e86650ec8089",
  type: "page-type/temper-lore-book",
  slug: "last-of-the-ayleid-kings",
  title: "Last of the Ayleid Kings",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8048,
  bookIndex: 82,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
