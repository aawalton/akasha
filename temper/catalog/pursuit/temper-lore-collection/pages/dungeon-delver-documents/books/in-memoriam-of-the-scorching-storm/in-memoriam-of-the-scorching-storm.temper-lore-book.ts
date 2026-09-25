import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inMemoriamOfTheScorchingStorm = {
  id: "01a0d60d-708d-73e3-979c-386ee1cc19bd",
  type: "page-type/temper-lore-book",
  slug: "in-memoriam-of-the-scorching-storm",
  title: "In Memoriam of the Scorching Storm",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8093,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
