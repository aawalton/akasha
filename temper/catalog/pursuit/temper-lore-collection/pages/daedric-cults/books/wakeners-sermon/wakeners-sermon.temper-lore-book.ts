import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wakenersSermon = {
  id: "01a0d5f2-253c-748a-b3f6-583d124c8a48",
  type: "page-type/temper-lore-book",
  slug: "wakeners-sermon",
  title: "Wakener's Sermon",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 4049,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
