import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const comeToVvardenfell = {
  id: "01a0d5f3-0ef7-7ccc-96f5-07b0a9b1b491",
  type: "page-type/temper-lore-book",
  slug: "come-to-vvardenfell",
  title: "Come to Vvardenfell!",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 4564,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
