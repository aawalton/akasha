import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inMemoriamOfTheGentleWarrior = {
  id: "01a0d60d-708d-7d7b-836f-edf9770501f8",
  type: "page-type/temper-lore-book",
  slug: "in-memoriam-of-the-gentle-warrior",
  title: "In Memoriam of the Gentle Warrior",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8092,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
