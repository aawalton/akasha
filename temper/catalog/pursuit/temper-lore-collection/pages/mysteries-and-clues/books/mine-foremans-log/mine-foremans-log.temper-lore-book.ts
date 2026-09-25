import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mineForemansLog = {
  id: "01a0d5f4-07b8-7811-b6f9-5a9772a0ff63",
  type: "page-type/temper-lore-book",
  slug: "mine-foremans-log",
  title: "Mine Foreman's Log",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 549,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
