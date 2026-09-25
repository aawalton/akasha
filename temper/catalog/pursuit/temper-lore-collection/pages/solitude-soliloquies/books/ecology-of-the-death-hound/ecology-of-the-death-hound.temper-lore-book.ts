import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ecologyOfTheDeathHound = {
  id: "01a0d60b-8107-71cc-a708-e57282988152",
  type: "page-type/temper-lore-book",
  slug: "ecology-of-the-death-hound",
  title: "Ecology of the Death Hound",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6210,
  bookIndex: 48,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 13, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
