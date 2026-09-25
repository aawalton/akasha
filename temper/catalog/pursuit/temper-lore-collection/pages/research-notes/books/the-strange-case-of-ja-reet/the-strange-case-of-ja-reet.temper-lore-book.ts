import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theStrangeCaseOfJaReet = {
  id: "01a0d5f5-1386-78bf-a7fa-0ea96349fb0e",
  type: "page-type/temper-lore-book",
  slug: "the-strange-case-of-ja-reet",
  title: "The Strange Case of Ja-Reet",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 859,
  bookIndex: 27,
  charted: true,
  mapCounts: [{ mapId: 1060, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
