import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secretsOfTreehenge = {
  id: "01a0d5f5-f3e4-7e98-8ad4-bab01882dc4b",
  type: "page-type/temper-lore-book",
  slug: "secrets-of-treehenge",
  title: "Secrets of Treehenge",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 789,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
