import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const werewolvesLongSufferingGuardians = {
  id: "01a0d60b-c958-77b3-b1cb-b980fcbc6e8e",
  type: "page-type/temper-lore-book",
  slug: "werewolves-long-suffering-guardians",
  title: "Werewolves: Long-Suffering Guardians",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6394,
  bookIndex: 36,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 42, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
