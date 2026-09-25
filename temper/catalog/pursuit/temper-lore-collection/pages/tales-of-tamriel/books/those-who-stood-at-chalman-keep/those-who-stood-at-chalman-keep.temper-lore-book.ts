import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thoseWhoStoodAtChalmanKeep = {
  id: "01a0d5f5-7768-7a53-9f80-17bd9a4dae4e",
  type: "page-type/temper-lore-book",
  slug: "those-who-stood-at-chalman-keep",
  title: "Those Who Stood at Chalman Keep",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 2396,
  bookIndex: 95,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
