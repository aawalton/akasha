import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const awaitMyEmissary = {
  id: "01a0d5f4-3c11-7377-b912-8703d100a8d2",
  type: "page-type/temper-lore-book",
  slug: "await-my-emissary",
  title: "Await My Emissary",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1407,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
