import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const slavesDiary = {
  id: "01a0d5f5-c96e-7978-9b05-da5d911285de",
  type: "page-type/temper-lore-book",
  slug: "slaves-diary",
  title: "Slave's Diary",
  collection: "temper-lore-collection/the-five-companions",
  esoBookId: 417,
  bookIndex: 1,
  charted: true,
  quest: 4607,
  positions: "jsonl",
} as const satisfies TemperLoreBook
