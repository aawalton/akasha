import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const necromancersDiary = {
  id: "01a0d60b-fdb0-7ef8-a2b0-68924c8958a2",
  type: "page-type/temper-lore-book",
  slug: "necromancers-diary",
  title: "Necromancer's Diary",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6695,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:51:45.200Z",
  updatedAt: "2026-09-25T00:51:47.000Z",
} as const satisfies TemperLoreBook
