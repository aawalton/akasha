import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dustyPage = {
  id: "01a0d5f5-7766-7772-b795-ab30c2c187a4",
  type: "page-type/temper-lore-book",
  slug: "dusty-page",
  title: "Dusty Page",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 331,
  bookIndex: 3,
  charted: true,
  quest: 4071,
  positions: "jsonl",
} as const satisfies TemperLoreBook
