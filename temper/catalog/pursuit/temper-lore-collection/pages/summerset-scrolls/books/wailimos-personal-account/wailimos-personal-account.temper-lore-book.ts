import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wailimosPersonalAccount = {
  id: "01a0d60a-d5be-7c31-a2ef-b9c51505d89f",
  type: "page-type/temper-lore-book",
  slug: "wailimos-personal-account",
  title: "Wailimo's Personal Account",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5051,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
