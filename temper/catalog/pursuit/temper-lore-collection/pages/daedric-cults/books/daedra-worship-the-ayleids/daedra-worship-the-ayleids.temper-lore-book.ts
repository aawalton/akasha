import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const daedraWorshipTheAyleids = {
  id: "01a0d5f2-253a-7b4c-9c10-8d1d4de109f0",
  type: "page-type/temper-lore-book",
  slug: "daedra-worship-the-ayleids",
  title: "Daedra Worship: The Ayleids",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 875,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
