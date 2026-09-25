import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const zombiesFurtherExperiments = {
  id: "01a0d5f5-1386-7a78-83a1-2e0a3e0e10bc",
  type: "page-type/temper-lore-book",
  slug: "zombies-further-experiments",
  title: "Zombies: Further Experiments",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1833,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
