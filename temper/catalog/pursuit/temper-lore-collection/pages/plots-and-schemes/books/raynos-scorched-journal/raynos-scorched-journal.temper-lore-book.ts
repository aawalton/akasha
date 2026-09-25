import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const raynosScorchedJournal = {
  id: "01a0d5f4-c389-7c8f-9dfc-8a90e0ffd9f9",
  type: "page-type/temper-lore-book",
  slug: "raynos-scorched-journal",
  title: "Rayno's Scorched Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 2199,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
