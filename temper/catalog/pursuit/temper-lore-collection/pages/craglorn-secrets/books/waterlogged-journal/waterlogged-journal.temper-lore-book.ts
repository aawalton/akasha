import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const waterloggedJournal = {
  id: "01a0d5f1-c91c-795a-b9f0-deb8147a4adb",
  type: "page-type/temper-lore-book",
  slug: "waterlogged-journal",
  title: "Waterlogged Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2588,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
