import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const daedraWorshipTheChimer = {
  id: "01a0d5f2-253a-75c0-a531-57a76bdc5161",
  type: "page-type/temper-lore-book",
  slug: "daedra-worship-the-chimer",
  title: "Daedra Worship: The Chimer",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 877,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
