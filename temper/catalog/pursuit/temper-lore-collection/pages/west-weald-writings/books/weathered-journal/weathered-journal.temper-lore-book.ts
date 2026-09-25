import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const weatheredJournal = {
  id: "01a0d60d-4ab1-77c4-af3d-aafc656eff9d",
  type: "page-type/temper-lore-book",
  slug: "weathered-journal",
  title: "Weathered Journal",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8102,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
