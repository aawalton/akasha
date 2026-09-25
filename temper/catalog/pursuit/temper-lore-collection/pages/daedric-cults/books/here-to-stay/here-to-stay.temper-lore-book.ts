import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hereToStay = {
  id: "01a0d5f2-253a-7437-b309-59c025367bc6",
  type: "page-type/temper-lore-book",
  slug: "here-to-stay",
  title: "Here to Stay",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2757,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
