import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const transmutationOfLivingCreatures = {
  id: "01a0d5f5-1386-7f8f-bcc7-d18d1b8faca9",
  type: "page-type/temper-lore-book",
  slug: "transmutation-of-living-creatures",
  title: "Transmutation of Living Creatures",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1381,
  bookIndex: 54,
  charted: true,
  quest: 4623,
  positions: "jsonl",
} as const satisfies TemperLoreBook
