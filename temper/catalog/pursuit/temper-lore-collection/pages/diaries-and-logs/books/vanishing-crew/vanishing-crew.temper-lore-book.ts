import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vanishingCrew = {
  id: "01a0d5f2-509f-7838-ac82-b422fc1c8b16",
  type: "page-type/temper-lore-book",
  slug: "vanishing-crew",
  title: "Vanishing Crew",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1389,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
