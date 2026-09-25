import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const quitAsking = {
  id: "01a0d5f4-3c12-76ec-a5fe-58d837133d51",
  type: "page-type/temper-lore-book",
  slug: "quit-asking",
  title: "Quit Asking",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2993,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
