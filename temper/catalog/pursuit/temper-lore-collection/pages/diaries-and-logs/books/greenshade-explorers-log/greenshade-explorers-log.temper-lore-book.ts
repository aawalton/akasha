import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const greenshadeExplorersLog = {
  id: "01a0d5f2-509e-741e-8065-487a816b228b",
  type: "page-type/temper-lore-book",
  slug: "greenshade-explorers-log",
  title: "Greenshade Explorer's Log",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1815,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
