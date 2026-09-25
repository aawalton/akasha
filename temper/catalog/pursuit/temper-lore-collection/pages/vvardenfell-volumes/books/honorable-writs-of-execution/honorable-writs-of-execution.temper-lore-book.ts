import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const honorableWritsOfExecution = {
  id: "01a0d5f7-aa98-76f5-b0e0-69f3a097ee66",
  type: "page-type/temper-lore-book",
  slug: "honorable-writs-of-execution",
  title: "Honorable Writs of Execution",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4011,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
