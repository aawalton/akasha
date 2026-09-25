import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const havocrelStrangersFromOblivion = {
  id: "01a0d5f2-253a-7a8a-83c7-e650fb90f665",
  type: "page-type/temper-lore-book",
  slug: "havocrel-strangers-from-oblivion",
  title: "Havocrel: Strangers from Oblivion",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 6512,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
