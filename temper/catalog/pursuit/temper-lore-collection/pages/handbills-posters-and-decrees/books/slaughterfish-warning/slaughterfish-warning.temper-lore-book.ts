import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const slaughterfishWarning = {
  id: "01a0d5f2-83a3-70e4-8125-1377aa9c3cc7",
  type: "page-type/temper-lore-book",
  slug: "slaughterfish-warning",
  title: "Slaughterfish Warning",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2373,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
