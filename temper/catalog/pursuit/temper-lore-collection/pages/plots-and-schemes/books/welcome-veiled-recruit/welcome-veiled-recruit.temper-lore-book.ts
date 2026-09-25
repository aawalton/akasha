import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const welcomeVeiledRecruit = {
  id: "01a0d5f4-c389-7370-acd4-a9b281756d0f",
  type: "page-type/temper-lore-book",
  slug: "welcome-veiled-recruit",
  title: "Welcome, Veiled Recruit",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1256,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
