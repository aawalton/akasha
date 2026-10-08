import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dwarvenWritings = {
  id: "01a0d5f4-07b7-7bcb-b470-f5feb39a2e61",
  type: "page-type/temper-lore-book",
  slug: "dwarven-writings",
  title: "Dwarven Writings",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1095,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:25:34.903Z",
  updatedAt: "2026-09-25T00:25:37.000Z",
} as const satisfies TemperLoreBook
